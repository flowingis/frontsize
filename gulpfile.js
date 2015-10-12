var gulp        = require('gulp'),
    fs          = require('fs'),
    fse         = require('fs-extra'),
    yaml        = require('js-yaml'),
    gulpCopy    = require('gulp-copy'),
    sass        = require('gulp-sass'),
    shell       = require('gulp-shell'),
    concat      = require('gulp-concat'),
    csslint     = require('gulp-csslint'),
    runSequence = require('run-sequence'),
    stylestats  = require('gulp-stylestats'),
    sourcemaps  = require('gulp-sourcemaps'),
    prompt       = require('gulp-prompt').prompt,
    colors      = require('colors/safe'),
    mkpath      = require('mkpath');

var frontsize = yaml.safeLoad(fs.readFileSync('./frontsize.yml', 'utf-8'));

gulp.task('default', function () {
    var tasks = [
        'sass:watch'
    ];
    runSequence(tasks);
});

gulp.task('sass:css:production', function () {
    gulp.src(frontsize.frontsizePath + frontsize.compile)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat(frontsize.prodCssName))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(frontsize.prodCssPath));
});

gulp.task('sass:css:test', function () {
    gulp.src(frontsize.frontsizePath + frontsize.compileTest)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
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
        'sass:assets:update'
    ]);
});

gulp.task('sass:assets:update', function () {
    gulp.src(frontsize.frontsizePath + 'themes/' + frontsize.themeName + '/img/**/*.*')
        .pipe(gulp.dest(frontsize.prodImgPath));
    gulp.src(frontsize.frontsizePath + 'themes/' + frontsize.themeName + '/fonts/**/*.*')
        .pipe(gulp.dest(frontsize.prodFontsPath));
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
        'sass:build'
    ];
    runSequence(tasks);
    gulp.watch(frontsize.frontsizePath + 'themes/**/*.scss', tasks);
});

gulp.task('sass:watch:assets', function(){
    var tasks = [
        'sass:build',
        'sass:assets'
    ];
    runSequence(tasks);
    gulp.watch([
        frontsize.frontsizePath + 'themes/**/*.scss',
        frontsize.frontsizePath + 'themes/**/img/**/*',
        frontsize.frontsizePath + 'themes/**/fonts/**/*'
    ], tasks);
});

/* frontsize setup */
var includes = {
    defaultTheme : './themes/default',
    themeFiles : [
        'README.md',
        'compile.scss',
        'compile-test.scss'
    ],
    projectFiles : [
        '.csslintrc',
        'package.json',
        'frontsize.yml.dist',
        'Gruntfile.js',
        'gulpfile.js'
    ],
    themePath : '',
    themeName : '',
    rootPath : ''
};

gulp.task('theme:new', function(){
    return gulp.src('themes/default', function(){
        console.log('You are creating a new theme for Frontsize...');
    })
    .pipe(prompt({
        type: 'input',
        name: 'theme',
        message: 'Theme name:'
    }, function(res){
        var pattern = new RegExp('([^a-zA-Z0-9]){1,}', 'g');
        includes.themeName = res.theme.replace(pattern, '-').toLowerCase();
    })).pipe(prompt({
        type: 'input',
        name: 'path',
        message: 'Set the path from here:'
    }, function(res){
        var pattern, path;
        pattern = new RegExp('([^\/])$', 'i');
        path = res.path.replace(pattern, '$1/');
        includes.themePath = path;
        includes.themePathFull = path + includes.themeName;

        console.log('Creating theme in path:');
        console.log(colors.green(includes.themePathFull));

        mkpath.sync(path, 0700);
        runSequence('theme:clone');
    }));
});

gulp.task('theme:clone', function(){
    gulp.src('themes/default', function(){
        console.log('Cloning default theme...');
    })
    .pipe(shell([
        'echo "\'<%= fromPath %>\'"',
        'echo "\'<%= toPath %>\'"',
        'cp -r <%= fromPath %> <%= toPath %>'
    ],{
        templateData : {
            fromPath : includes.defaultTheme,
            toPath : includes.themePathFull
        }
    }));
    runSequence([
        'theme:release',
        'theme:project'
    ]);
});

gulp.task('theme:release', function(){
    console.log('Cloning original release theme project files...');
    gulp.src(includes.themeFiles)
    .pipe(gulpCopy(includes.themePath));
});

gulp.task('theme:project', function(){
    gulp.src(includes.projectFiles)
    .pipe(prompt.confirm({
        message: 'Would you like to place frontsize automation project files on your main project root folder?\nWARNING: package.json, Gruntfile.js and gulpfile.js will be overwritten.',
        default: true
    }))
    .pipe(prompt({
        type: 'input',
        name: 'path',
        message: 'Set the main project root folder:'
    }, function(res){
        includes.rootFolder = res.path;
    }));
    runSequence('theme:rootProject');
});

gulp.task('theme:rootProject', function(){
    return gulp.src(includes.projectFiles)
    .pipe(gulpCopy(includes.rootPath));
});
