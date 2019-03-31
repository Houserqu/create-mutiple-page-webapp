var ejs = require("gulp-ejs")
var gulp = require("gulp")
var del = require("del")
var gulpSequence = require("gulp-sequence") //然后主角登场

gulp.task("del", function() {
  return del("dist/**")
})

gulp.task(
  "default",
  gulp.series("del", function() {
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
)

// gulp.task("default", gulpSequence("build"))
