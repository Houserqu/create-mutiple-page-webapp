var ejs = require("gulp-ejs")
var gulp = require("gulp")
var del = require("del")
var ts = require("gulp-typescript")
var tsProject = ts.createProject("tsconfig.json")
var browserify = require("browserify")
var source = require("vinyl-source-stream")
var tsify = require("tsify")

gulp.task("del", function() {
  return del("dist/**")
})

// gulp.task("ts", function() {
//   return tsProject
//     .src()
//     .pipe(tsProject())
//     .js.pipe(gulp.dest("dist/js"))
// })

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

gulp.task("copy-public", function() {
  return gulp.src(["./src/public/**/*"]).pipe(gulp.dest("./dist"))
})

gulp.task("copy-js-vendor", function() {
  return gulp.src(["./src/js/vendor/**/*"]).pipe(gulp.dest("./dist/js/vendor"))
})

gulp.task(
  "default",
  gulp.series("del", "ejs", "copy-public", "copy-js-vendor", function() {
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
)

// gulp.task("default", gulpSequence("build"))
