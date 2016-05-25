var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  analyzer     = require('analyze-css'),
  bower        = require('gulp-bower'),
  colors       = require('colors'),
  concat       = require('gulp-concat'),
  csslint      = require('gulp-csslint'),
  moment       = require('moment'),
  plugins      = require('gulp-load-plugins')(),
  run          = require('run-sequence'),
  sass         = require('gulp-sass'),
  sourcemaps   = require('gulp-sourcemaps'),
  stylestats   = require('gulp-stylestats'),
  uglify       = require('gulp-uglify'),
  uglifyCss    = require('gulp-uglifycss'),
  yaml         = require('js-yaml'),
  fs           = require('fs'),
  browserSync  = require('browser-sync');

var f, buildIndex, buildTasks, themesTotal;

debug = true;

f = false;
buildIndex = 0;
buildTasks = [];

for (var i = 0; i < process.argv.length; i += 1) {
    if (process.argv[i] === '--config') {
        if (process.argv[i+1] !== undefined) {
            var file = process.argv[i + 1];
            f = yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
        }
    }
}

if (!f) {
  f = yaml.safeLoad(fs.readFileSync('./frontsize.yml', 'utf-8'));
}

if (f.frontsize === undefined) {
  console.log(colors.red('Error: object frontsize is NOT present in YAML configuration.'));
  process.exit();
}

themesTotal = f.frontsize.themes.length;

var messageVerbose = function(title, message) {
  if (f.frontsize.verbose !== undefined && f.frontsize.verbose >= 3) {
    if (message !== undefined) {
      console.log(colors.blue(title.trim() + ': ') + message.trim());
    } else {
      console.log(colors.blue(title.trim()));
    }
  }
};

var message = function(message, force) {
  if (force !== undefined && force || f.frontsize.verbose !== undefined && f.frontsize.verbose >= 2) {
    console.log(message.trim());
  }
};

var messageError = function(message) {
  if (f.frontsize.verbose !== undefined && f.frontsize.verbose >= 1) {
    console.log(colors.red('Error: ') + message.trim());
  }
};

var taskPrefix = function(themeName, action) {
  return 'frontsize:theme:' + themeName + ':' + action;
};

var tasksList = function(theme, taskNames) {
  var tasks = [];
  for (var i = 0; i < taskNames.length; i += 1) {
    tasks.push(taskPrefix(theme.name, taskNames[i]));
  }
  return tasks;
};

var tasks = function(theme, taskNames) {
  var tasks = {};
  for (var i = 0; i < taskNames.length; i += 1) {
    tasks[taskNames[i]] = taskPrefix(theme.name, taskNames[i]);
  }
  return tasks;
};

var addTask = function(theme, index){

  var compile, file, name, report, test, images, fonts, destinationPath, task, tasksToBuild, testTasks, reportTasks, buildDependecies;

  compile = theme.compile;
  file = theme.file;
  name = theme.name;
  images = theme.images || false;
  fonts = theme.fonts || false;
  report = theme.stylestats ? true : false;
  test = theme.csslint ? true : false;

  destinationPath = f.paths.css;

  testTasks = ['css'];
  reportTasks = ['test'];

  tasksToBuild = ['build', 'css'];

  if (images) {
    tasksToBuild.push('images');
    reportTasks.push('images');
    testTasks.push('images');
  }
  if (fonts) {
    tasksToBuild.push('fonts');
    reportTasks.push('fonts');
    testTasks.push('fonts');
  }
  if (test) { tasksToBuild.push('test'); }
  if (report) { tasksToBuild.push('report'); }

  task = tasks(theme, tasksToBuild);
  tasksToBuild = tasksToBuild.splice(1);
  buildTasks.push(task.build);

  gulp.task(task.css, function () {
    var themeNumber = '';
    if (themesTotal >= 1) {
      themeNumber = ' [' + (index + 1) + '/' + themesTotal + ']';
    }
    message('');
    messageVerbose('Build theme', name + themeNumber);
    messageVerbose('Destination', destinationPath);
    return gulp.src(compile)
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      .pipe(concat(file))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(destinationPath));
  });

  if (test) {
    gulp.task(task.test, function () {
      messageVerbose('CSSlint', file);
      run(tasksList(theme, testTasks));
      return gulp.src(destinationPath + file)
        .pipe(csslint(f.test.csslint))
        .pipe(csslint.reporter());
    });
  } else {
    reportTasks = testTasks;
  }

  if (report) {
    gulp.task(task.report, function () {
      messageVerbose('Stylestats', file);
      run(tasksList(theme, reportTasks));
      return gulp.src(destinationPath + file)
        .pipe(stylestats());
    });
  }

  if (images) {
    gulp.task(task.images, function () {
      messageVerbose('Copying theme "' + name +  '" images to', f.paths.images + name);
      return gulp.src(images)
        .pipe(gulp.dest(f.paths.images + name));
    });
  }

  if (fonts) {
    gulp.task(task.fonts, function () {
      messageVerbose('Copying theme "' + name +  '" fonts to', f.paths.fonts + name);
      return gulp.src(fonts)
        .pipe(gulp.dest(f.paths.fonts + name));
    });
  }

  buildDependecies = tasksList(theme, tasksToBuild);
  buildDependecies = buildTasks.slice(0, buildTasks.length-1).concat(buildDependecies);

  gulp.task(task.build, function(){
    run(buildDependecies);
  });
};

if (f.frontsize !== undefined && f.frontsize.themes) {
  messageVerbose('Starting GRINDER');
  for (var t = 0; t < f.frontsize.themes.length; t += 1) {
    addTask(f.frontsize.themes[t], t);
  }
}

// gulp.task('frontsize:vendors:css', function () {
//     if (f.vendors !== undefined && f.vendors.css !== undefined) {
//         if (f.verbose !== undefined && f.verbose === true) {
//             messageVerbose('Merging CSS vendors');
//             var i = 0;
//             for (i = 0; i < f.vendors.css.length; i += 1) {
//                 console.log(f.paths.fonts + f.vendors.css[i]);
//             }
//             console.log('to file "' + f.paths.css + cssVendorsFileName + '"');
//         }
//         return gulp.src(f.vendors.css)
//             .pipe(uglifyCss())
//             .pipe(concat(cssVendorsFileName))
//             .pipe(gulp.dest(f.paths.css));
//     } else {
//         if (f.verbose !== undefined && f.verbose === true) { console.log('Vendor\'s CSS not found, skipping task'); }
//         return gulp;
//     }
// });
//
// gulp.task('frontsize:vendors:fonts', function () {
//     if (f.vendors !== undefined && f.vendors.fonts !== undefined) {
//         if (f.verbose !== undefined && f.verbose === true) {
//             console.log('Copying Fonts vendors');
//             var i = 0;
//             for (i = 0; i < f.vendors.fonts.length; i += 1) {
//                 console.log(f.vendors.fonts[i]);
//             }
//             console.log('to ' + f.paths.fonts);
//         }
//         return gulp.src(f.vendors.fonts)
//             .pipe(gulp.dest(f.paths.fonts));
//     } else {
//         if (f.verbose !== undefined && f.verbose === true) { console.log('Vendor\'s Fonts not found, skipping task'); }
//         return gulp;
//     }
// });
//
// gulp.task('frontsize:vendors:images', function () {
//     if (f.vendors !== undefined && f.vendors.images !== undefined) {
//         if (f.verbose !== undefined && f.verbose === true) {
//             console.log('Copying Images vendors');
//             var i = 0;
//             for (i = 0; i < f.vendors.images.length; i += 1) {
//                 console.log(f.vendors.images[i]);
//             }
//             console.log('to ' + f.paths.images);
//         }
//         return gulp.src(f.vendors.images)
//             .pipe(gulp.dest(f.paths.images));
//     } else {
//         if (f.verbose !== undefined && f.verbose === true) { console.log('Vendor\'s Images not found, skipping task'); }
//         return gulp;
//     }
// });
//
// gulp.task('frontsize:vendors', function () {
//     var tasks = [
//         'frontsize:vendors:css',
//         'frontsize:vendors:fonts',
//         'frontsize:vendors:images'
//     ];
//     run(tasks);
// });
//
// gulp.task('frontsize:js', function () {
//     if (f.js !== undefined && f.js.files !== undefined) {
//         if (f.verbose !== undefined && f.verbose === true) {
//             console.log('Merging JavaScript vendors');
//             var i = 0;
//             for (i = 0; i < f.vendors.css.length; i += 1) {
//                 console.log(f.paths.fonts + f.vendors.css[i]);
//             }
//             console.log('to file "' + f.paths.css + cssVendorsFileName + '"');
//         }
//         return gulp.src(f.js.files)
//             .pipe(sourcemaps.init())
//             .pipe(uglify())
//             .pipe(concat(f.js.name || jsFileName))
//             .pipe(sourcemaps.write('./'))
//             .pipe(gulp.dest(f.paths.js));
//
//     } else {
//         if (f.verbose !== undefined && f.verbose === true) { console.log('Vendor\'s JavaScript not found, skipping task'); }
//         return gulp;
//     }
// });
//
// gulp.task('js:watch', function () {
//     var tasks = [
//         'frontsize:js'
//     ];
//     run(tasks);
//     var watchList = [
//         f.paths.frontsize + f.theme + '/**/*.scss',
//         f.paths.frontsize + f.theme + '/**/img/**/*',
//         f.paths.frontsize + f.theme + '/**/fonts/**/*'
//     ];
//     if (f.js !== undefined && f.js.watch !== undefined) {
//         watchList.push(f.js.watch);
//     }
//     return gulp.watch(watchList, tasks);
// });
//
// gulp.task('frontsize:merge', ['frontsize:vendors:css', 'frontsize:css'], function () {
//     if (f.vendors !== undefined && f.vendors.css !== undefined) {
//         if (f.verbose !== undefined && f.verbose === true) { console.log('Merging CSS vendors with frontsize to "' + f.paths.css + cssMergeFileName + '"'); }
//         var css = f.vendors.css.slice(0);
//         css.push(f.paths.test + cssTestFileName);
//         return gulp.src(css)
//             .pipe(uglifyCss())
//             .pipe(concat(cssMergeFileName))
//             .pipe(gulp.dest(f.paths.css));
//     } else {
//         if (f.verbose !== undefined && f.verbose === true) { console.log('CSS vendors not found, skipping merge with frontsize'); }
//         return gulp;
//     }
// });

gulp.task('frontsize:http', function() {

    browserSync.init({
        server: {
            baseDir: f.server.path
        },
       logLevel: 'info',
       notify: true
    });

    run('frontsize:watch:http');

    var watchList = [
        f.paths.server + '**/*.html',
        f.paths.css + '**/*.css',
        f.paths.images + '**/*',
        f.paths.js + '**/*.js'
    ];
    gulp.watch(watchList).on('change', browserSync.reload);
});

gulp.task('frontsize:watch:http', ['frontsize:watch'], function() {
    return browserSync.stream();
});

gulp.task('frontsize:watch:message:start', function () {
    if (buildIndex === 0) {
        message('Starting build process...');
    } else {
        messageVerbose('Event', 'Hey, something changed, wait some moment...');
    }
});

gulp.task('frontsize:watch:message:end', buildTasks, function () {
    buildIndex += 1;
    message('Build ' + colors.yellow('[ ' + buildIndex + ' ]') + ' done at ' + colors.yellow(moment().format('HH:mm')) + ' and ' + colors.yellow(moment().format('ss')) + ' seconds.', true);
    message(colors.green('Tasks successfully finished'));
    message('Waiting for file changes...');
});

gulp.task('frontsize:watch', function () {
    var tasks = [
        'frontsize:watch:message:start',
        'frontsize:build',
        'frontsize:watch:message:end'
    ];
    run(tasks);
    var watchList = [ f.frontsize.watch ];
    if (f.js !== undefined && f.js.watch !== undefined) {
        watchList.push(f.js.watch);
    }
    return gulp.watch(watchList, tasks);
});

gulp.task('frontsize:build', function(){
  // 'frontsize:vendors'
  // 'frontsize:merge'
  run(buildTasks);
});

gulp.task('default', function(){
  run('frontsize:build');
});
