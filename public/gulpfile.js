var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var inlinesource = require('gulp-inline-source');
var runSequence = require('run-sequence');

// optimize images using imagemin
gulp.task('imagemin', function () {
    gulp.src('img/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('public/img'))
});

// Inline css
gulp.task('inlinesource', function () {
    var options = {
        compress: true
    };

    return gulp.src(['*html', '!node_modules'])
        .pipe(inlinesource(options))
        .pipe(gulp.dest('public'));
});

// Minify HTML
gulp.task('minify-html', ['inlinesource'],function() {
    var opts = {};
    gulp.src('public/*html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('public/'))
});

//copy (manifest, js and icons)
gulp.task('copy', function () {
    gulp.src(['manifest.webmanifest', '*png', '*js'])
        .pipe(gulp.dest('public/'));
});

//copy icons
gulp.task('copy-icons', function () {
    gulp.src('*png')
        .pipe(gulp.dest('public/'));
});

// Build
gulp.task('build', function () {
  runSequence('imagemin', 'minify-html', 'copy',function () {});
});