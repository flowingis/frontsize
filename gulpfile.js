var gulp        = require('gulp'),
    fs          = require('fs'),
    yaml        = require('js-yaml'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    csslint     = require('gulp-csslint'),
    symlink     = require('gulp-symlink'),
    uglifyCss   = require('gulp-uglifycss'),
    runSequence = require('run-sequence'),
    stylestats  = require('gulp-stylestats'),
    sourcemaps  = require('gulp-sourcemaps'),
    plugins     = require('gulp-load-plugins')();

var frontsize = yaml.safeLoad(fs.readFileSync('./frontsize.yml', 'utf-8'));

gulp.task('default', function () {
    var tasks = [
        'sass:assets',
        'sass:build'
    ];
    runSequence(tasks);
});

gulp.task('sass:watch', function () {
    var tasks = [
        'sass:build'
    ];
    runSequence(tasks);
    gulp.watch(frontsize.frontsizePath + 'themes/**/*.scss', tasks);
});

gulp.task('sass:css:production', function () {
    gulp.src(frontsize.frontsizePath + frontsize.compile)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat(frontsize.cssName))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(frontsize.cssPath));
});

gulp.task('sass:css:test', function () {
    gulp.src(frontsize.frontsizePath + frontsize.compileTest)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' })
        .on('error', sass.logError))
        .pipe(concat(frontsize.testCssName))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(frontsize.frontsizePath + frontsize.testCssPath));
});

gulp.task('sass:test:csslint', function () {
    gulp.src(frontsize.frontsizePath + frontsize.testCssPath + frontsize.testCssName)
        .pipe(csslint('.csslintrc'))
        .pipe(csslint.reporter());
});

gulp.task('sass:report:stylestats', function () {
    gulp.src(frontsize.frontsizePath + frontsize.testCssPath + frontsize.testCssName)
        .pipe(csslint('.csslintrc'))
        .pipe(stylestats());
});

gulp.task('sass:assets', function () {
    runSequence([
        //'sass:css:vendors',
        'sass:assets:update'
    ]);
});

gulp.task('sass:assets:update', function () {
    gulp.src(frontsize.frontsizePath + 'themes/ehoreca/img/**/*.*')
        .pipe(gulp.dest(frontsize.copyToProdImg));
    gulp.src(frontsize.frontsizePath + 'themes/ehoreca/fonts/**/*.*')
        .pipe(gulp.dest(frontsize.copyToProdFonts));
});

gulp.task('sass:build', function () {
    var tasks = [
        'sass:css:production',
        'sass:css:test',
        'sass:report:stylestats',
        'sass:test:csslint'
    ];
    runSequence(tasks);
});

gulp.task('sass:watch', function () {
    var tasks = [
        'sass:build',
        'sass:assets'
    ];
    runSequence(tasks);
    gulp.watch(frontsize.frontsizePath + 'themes/**/*.scss', tasks);
});

gulp.task('sass:watch:assets', function(){
    var tasks = [
        'sass:css:production',
        'sass:assets',
        'sass:css:test',
        'sass:test:csslint'
    ];
    runSequence(tasks);
    gulp.watch([
        frontsize.frontsizePath + 'themes/**/*.scss',
        frontsize.frontsizePath + 'themes/**/img/**/*',
        frontsize.frontsizePath + 'themes/**/fonts/**/*',
        frontsize.frontsizePath + 'themes/**/vendor/**/*.scss',
    ], tasks);
});
