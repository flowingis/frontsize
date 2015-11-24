var gulp        = require('gulp'),
    fs          = require('fs'),
    yaml        = require('js-yaml'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    csslint     = require('gulp-csslint'),
    runSequence = require('run-sequence'),
    stylestats  = require('gulp-stylestats'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglifyCss   = require('gulp-uglifycss');

var f, compileFile, cssFileName, cssTestFileName, cssVendorsFileName, cssMergeFileName, jsFileName;

f = yaml.safeLoad(fs.readFileSync('./frontsize.yml', 'utf-8'));
compileFile        = 'compile.scss';
cssFileName        = 'frontsize-theme.min.css';
cssTestFileName    = 'frontsize.csslint.css';
cssVendorsFileName = 'vendors.min.css';
jsFileName         = 'frontsize.min.js';
cssMergeFileName   = 'frontsize.min.css';

gulp.task('default', function () {
    var tasks = [
        'frontsize:watch'
    ];
    runSequence(tasks);
});

gulp.task('frontsize:css', function () {
    if (f.verbose !== undefined && f.verbose === true) { console.log('Creating: ' + f.path.css + cssFileName); }
    return gulp.src(f.path.frontsize + compileFile)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat(cssFileName))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(f.path.css));
});

gulp.task('frontsize:sourcemap', function () {
    return gulp.src(f.path.frontsize + compileFile)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(concat(cssTestFileName))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(f.path.test));
});

gulp.task('frontsize:test', function () {
    var tasks = [
        'frontsize:test:build',
        'frontsize:test:report'
    ];
    runSequence(tasks);
});

gulp.task('frontsize:test:build', function () {
    if (f.verbose !== undefined && f.verbose === true) { console.log('Creating: ' + f.path.test + 'frontsize.test.css'); }
    return gulp.src('test/frontsize/test.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('frontsize.test.css'))
        .pipe(gulp.dest(f.path.test));
});

gulp.task('frontsize:test:report', ['frontsize:test:build'], function () {
    return gulp.src(f.path.test + 'frontsize.test.css')
        .pipe(csslint('test/.csslintrc'))
        .pipe(stylestats());
});

gulp.task('frontsize:report', ['frontsize:sourcemap'], function () {
    return gulp.src(f.path.test + cssTestFileName)
        .pipe(csslint('.csslintrc'))
        .pipe(stylestats());
});

gulp.task('frontsize:assets:images', function () {
    var path = f.path.frontsize + 'themes/' + f.theme + '/img/**/*.*';
    if (f.verbose !== undefined && f.verbose === true) { console.log('Copying theme\'s images assets: "' + path + '" to "' + f.path.images + '"'); }
    return gulp.src(path)
        .pipe(gulp.dest(f.path.images));
});

gulp.task('frontsize:assets:fonts', function () {
    var path = f.path.frontsize + 'themes/' + f.theme + '/fonts/**/*.*';
    if (f.verbose !== undefined && f.verbose === true) { console.log('Copying theme\'s fonts assets: "' + path + '" to "' + f.path.fonts + '"'); }
    return gulp.src(path)
        .pipe(gulp.dest(f.path.fonts));
});

gulp.task('frontsize:build', function () {
    var tasks = [
        'frontsize:css',
        'frontsize:assets:images',
        'frontsize:assets:fonts',
        'frontsize:vendors',
        'frontsize:js',
        'frontsize:merge',
        'frontsize:sourcemap',
        'frontsize:report'
    ];
    runSequence(tasks);
});

gulp.task('frontsize:watch', function () {
    var tasks = [
        'frontsize:build'
    ];
    runSequence(tasks);
    var watchList = [
        f.path.frontsize + 'themes/**/*.scss',
        f.path.frontsize + 'themes/**/img/**/*',
        f.path.frontsize + 'themes/**/fonts/**/*'
    ];
    if (f.js !== undefined && f.js.watch !== undefined) {
        watchList.push(f.js.watch);
    }
    return gulp.watch(watchList, tasks);
});

gulp.task('frontsize:vendors', function(){
    var tasks = [
        'frontsize:vendors:css',
        'frontsize:vendors:fonts',
        'frontsize:vendors:images'
    ];
    runSequence(tasks);
});

gulp.task('frontsize:vendors:css', function () {
    if (f.vendors !== undefined && f.vendors.css !== undefined) {
        if (f.verbose !== undefined && f.verbose === true) {
            console.log('Merging CSS vendors');
            var i = 0;
            for (i = 0; i < f.vendors.css.length; i += 1) {
                console.log(f.path.fonts + f.vendors.css[i]);
            }
            console.log('to file "' + f.path.css + cssVendorsFileName + '"');
        }
        return gulp.src(f.vendors.css)
            .pipe(uglifyCss())
            .pipe(concat(cssVendorsFileName))
            .pipe(gulp.dest(f.path.css));
    } else {
        if (f.verbose !== undefined && f.verbose === true) { console.log('Vendor\'s CSS not found, skipping task'); }
        return gulp;
    }
});

gulp.task('frontsize:vendors:fonts', function () {
    if (f.vendors !== undefined && f.vendors.fonts !== undefined) {
        if (f.verbose !== undefined && f.verbose === true) {
            console.log('Copying Fonts vendors');
            var i = 0;
            for (i = 0; i < f.vendors.fonts.length; i += 1) {
                console.log(f.vendors.fonts[i]);
            }
            console.log('to ' + f.path.fonts);
        }
        return gulp.src(f.vendors.fonts)
            .pipe(gulp.dest(f.path.fonts));
    } else {
        if (f.verbose !== undefined && f.verbose === true) { console.log('Vendor\'s Fonts not found, skipping task'); }
        return gulp;
    }
});

gulp.task('frontsize:vendors:images', function () {
    if (f.vendors !== undefined && f.vendors.images !== undefined) {
        if (f.verbose !== undefined && f.verbose === true) {
            console.log('Copying Images vendors');
            var i = 0;
            for (i = 0; i < f.vendors.images.length; i += 1) {
                console.log(f.vendors.images[i]);
            }
            console.log('to ' + f.path.images);
        }
        return gulp.src(f.vendors.images)
            .pipe(gulp.dest(f.path.images));
    } else {
        if (f.verbose !== undefined && f.verbose === true) { console.log('Vendor\'s Images not found, skipping task'); }
        return gulp;
    }
});

gulp.task('frontsize:js', function () {
    if (f.js !== undefined && f.js.files !== undefined) {
        if (f.verbose !== undefined && f.verbose === true) {
            console.log('Merging JavaScript vendors');
            var i = 0;
            for (i = 0; i < f.vendors.css.length; i += 1) {
                console.log(f.path.fonts + f.vendors.css[i]);
            }
            console.log('to file "' + f.path.css + cssVendorsFileName + '"');
        }
        return gulp.src(f.js.files)
            .pipe(uglify())
            .pipe(concat(f.js.name || jsFileName))
            .pipe(gulp.dest(f.path.js));
    } else {
        if (f.verbose !== undefined && f.verbose === true) { console.log('Vendor\'s JavaScript not found, skipping task'); }
        return gulp;
    }
});

gulp.task('frontsize:merge', ['frontsize:vendors:css', 'frontsize:css'], function () {
    if (f.vendors !== undefined && f.vendors.css !== undefined) {
        if (f.verbose !== undefined && f.verbose === true) { console.log('Merging CSS vendors with frontsize to "' + f.path.css + cssMergeFileName + '"'); }
        var css = f.vendors.css.slice(0);
        css.push(f.path.test + cssTestFileName);
        return gulp.src(css)
            .pipe(uglifyCss())
            .pipe(concat(cssMergeFileName))
            .pipe(gulp.dest(f.path.css));
    } else {
        if (f.verbose !== undefined && f.verbose === true) { console.log('CSS vendors not found, skipping merge with frontsize'); }
        return gulp;
    }
});
