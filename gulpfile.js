var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');

gulp.task('jshint', function() {
  return gulp.src(['js/*.js', 'spec/*.js', '*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});
