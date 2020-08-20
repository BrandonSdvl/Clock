const gulp = require("gulp")
const pug = require('gulp-pug')
const sass = require("gulp-sass")
const babel = require("gulp-babel")
const autoprefixer = require("gulp-autoprefixer")
const concat = require("gulp-concat")
const terser = require("gulp-terser")
const plumber = require("gulp-plumber")
const browserSync = require('browser-sync')

const server = browserSync.create()

gulp.task('pug', () => {
    return gulp.src('./dev/views/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: false
        }))
        .pipe(gulp.dest('./docs'))
})

gulp.task("styles", () => {
    return gulp
        .src('./dev/scss/styles.scss')
        .pipe(plumber())
        .pipe(
            sass({
                outputStyle: "compressed"
            })
        )
        .pipe(
            autoprefixer()
        )
        .pipe(gulp.dest('./docs/css'))
        .pipe(server.stream())
})

gulp.task("babel", () => {
    return gulp
        .src("./dev/js/*.js")
        .pipe(plumber())
        .pipe(
            babel({
                presets: ["@babel/preset-env"]
            })
        )
        .pipe(concat("scripts-min.js"))
        .pipe(terser())
        .pipe(gulp.dest("./docs/js/"))
})

gulp.task('default', () => {
    server.init({
        server: './docs/'
    })
    gulp.watch('./dev/views/**/*.pug', gulp.series('pug')).on('change', server.reload)
    gulp.watch('./dev/scss/**/*.scss', gulp.series('styles'))
    gulp.watch("./dev/js/*.js", gulp.series('babel')).on('change', server.reload)
})