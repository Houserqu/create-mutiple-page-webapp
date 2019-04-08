var ejs = require("gulp-ejs")
var gulp = require("gulp")
var del = require("del")
var browserify = require("browserify")
var watchify = require("watchify")
var source = require("vinyl-source-stream")
var tsify = require("tsify")
var less = require("gulp-less")
var cssmin = require("gulp-cssmin")
var gutil = require("gulp-util")
var browserSync = require("browser-sync")
var rev = require("gulp-rev-append")
var rename = require("gulp-rename")
var es = require("event-stream")
var glob = require("glob")

// 路径定义
var path = {
  tsEntries: ["src/js/index.ts", "src/js/detail.ts"]
}

// 创建静态服务器
var server = browserSync.create()
gulp.task("serve", function(done) {
  server.init({
    server: {
      baseDir: "./dist"
    }
  })
  done()
})

// 重载浏览器页面
gulp.task("reload", function(done) {
  server.reload()
  done()
})

gulp.task("del", function() {
  return del("dist/**/*")
})

// 编译 ejs 模板
gulp.task("ejs", function() {
  return gulp
    .src("./src/*.ejs")
    .pipe(
      ejs(
        {
          msg: "Hello Gulp!"
        },
        {},
        { ext: ".html" }
      )
    )
    .pipe(gulp.dest("./dist"))
})

// 拷贝无需编译的静态文件
gulp.task("copy-public", function() {
  return gulp
    .src(
      [
        "./src/**/*",
        "!./src/*.ejs",
        "!./src/style/**",
        "!./src/template-public/**",
        "!./src/js/**"
      ],
      {
        nodir: true
      }
    )
    .pipe(gulp.dest("./dist"))
})

// 拷贝 js 库
gulp.task("copy-js-vendor", function() {
  return gulp.src(["./src/js/vendor/**/*"]).pipe(gulp.dest("./dist/js/vendor"))
})

// 拷贝 js 库
gulp.task("ts", function(done) {
  glob("./src/js/*.ts", function(err, files) {
    if (err) {
      done(err)
      return
    }

    var tasks = files.map(function(entry) {
      return browserify({ entries: [entry] })
        .plugin(tsify)
        .bundle()
        .pipe(source(entry))
        .pipe(
          rename({
            dirname: "",
            extname: ".bundle.js"
          })
        )
        .pipe(gulp.dest("./dist/js"))
    })

    es.merge(tasks).on("end", done)
  })
})

// 编译 less
gulp.task("less", function() {
  return gulp
    .src("./src/style/**/*.less")
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/style"))
})

// js，css 追加版本号
gulp.task("rev", function() {
  return gulp
    .src("./dist/**/*.html")
    .pipe(rev())
    .pipe(gulp.dest("./dist"))
})

// 监听 ts 文件，使用 watchify 进行更新
gulp.task("watch:ts", function(done) {
  glob("./src/js/*.ts", function(err, files) {
    if (err) {
      done(err)
      return
    }

    files.forEach(file => {
      // console.log(file)
      var bundler = watchify(browserify({ entries: file }).plugin(tsify))
      // console.log(bundler)
      bundlerFn = function() {
        return bundler
          .bundle()
          .pipe(source(file))
          .pipe(
            rename({
              dirname: "",
              extname: ".bundle.js"
            })
          )
          .pipe(gulp.dest("dist/js"))
          .pipe(server.reload({ stream: true }))
      }

      bundler.on("update", bundlerFn)
      bundler.on("log", gutil.log)

      return bundlerFn()
    })
  })
})

// 监听文件变动自动构建
gulp.task("watch", function() {
  gulp.watch(["./src/**/*.ejs"], gulp.series("ejs", "reload"))
  gulp.watch(["./src/style/*.less"], gulp.series("less", "reload"))
  gulp.watch(
    [
      "./src/**/*",
      "!./src/*.ejs",
      "!./src/style/**",
      "!./src/template-public/**",
      "!./src/js/**"
    ],
    gulp.series("copy-public")
  )
  gulp.watch(["./src/js/vendor/**/*"], gulp.series("copy-js-vendor"))
})

// build 主任务
gulp.task(
  "default",
  gulp.series(
    "del",
    "ejs",
    "ts",
    "less",
    "copy-public",
    "copy-js-vendor",
    "rev"
  )
)

// dev 主任务
gulp.task("dev", gulp.series("serve", "watch:ts", "watch"))
