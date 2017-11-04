var gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat')
;

gulp.task('watch', function () {
    return watch('app/**/*.js', function () {
        build();
    });
});

gulp.task('build', function () {
    build();
});

function build() {
    return gulp.src('app/**/*.js')
        .pipe(concat('credit.min.js'))
        .pipe(gulp.dest('build'));
}