const { series, watch, src, dest } = require('gulp')
const minifyHTML = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const inlinesource = require('gulp-inline-source')
const ghPages = require('gh-pages')

function images () {
    return src('img/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(dest('public/img'))
}

function inline () {
    return src(['*.html', '!node_modules'])
        .pipe(inlinesource({ compress: true }))
        .pipe(dest('public'))
}

function minify () {
    return src('public/*.html')
        .pipe(minifyHTML({ collapseWhitespace: true }))
        .pipe(dest('public/'))
}

function copy () {
    return src('static/**/*')
        .pipe(dest('public/'))
}

function deploy (cb) {
    ghPages.publish('public', { branch: 'master' }, cb)
}

exports.build = series(images, inline, minify, copy)
exports.deploy = deploy