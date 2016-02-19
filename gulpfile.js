var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var utilities = require('gulp-util');

var lib = require('bower-files')({
  'overrides': {
    'bootstrap-sass': {
      'main': [
        'assets/javascripts/bootstrap.js'
      ]
    }
  }
});

var browserSync = require('browser-sync').create();

var buildProduction = utilities.env.production;

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

gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyScripts', ['jsBrowserify'], function() {
  return gulp.src('./build/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('sassToCSS', function() {
  return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('jsBower', function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('bowerProduction', ['jsBower']);

gulp.task('clean', function() {
  return del(['build', 'tmp']);
});

gulp.task('build', ['clean'], function() {
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bowerProduction');
  gulp.start('cssBuild');
  gulp.start('jshint');
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });

  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(['scss/*.scss'], ['cssBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
});

gulp.task('jsBuild', ['jsBrowserify'], function() {
  browserSync.reload();
});

gulp.task('htmlBuild', function() {
  browserSync.reload();
});

gulp.task('cssBuild', ['sassToCSS'], function() {
  browserSync.reload();
});

gulp.task('bowerBuild', ['bowerProduction'], function() {
  browserSync.reload();
});
