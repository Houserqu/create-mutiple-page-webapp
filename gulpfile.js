var ejs = require("gulp-ejs")
var gulp = require("gulp")
var del = require("del")
var ts = require("gulp-typescript")
var tsProject = ts.createProject("tsconfig.json")
var browserify = require("browserify")
var source = require("vinyl-source-stream")
var tsify = require("tsify")
var less = require("gulp-less")
var cssmin = require("gulp-cssmin")

gulp.task("del", function() {
  return del("dist/**")
})

// gulp.task("ts", function() {
//   return tsProject
//     .src()
//     .pipe(tsProject())
//     .js.pipe(gulp.dest("dist/js"))
// })

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
gulp.task("ts", function() {
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/js/index.ts"],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist/js"))
})

gulp.task("less", function() {
  return gulp
    .src("./src/style/**/*.less")
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/style"))
})

gulp.task(
  "default",
  gulp.series("del", "ejs", "ts", "less", "copy-public", "copy-js-vendor")
)

// gulp.task("default", gulpSequence("build"))
