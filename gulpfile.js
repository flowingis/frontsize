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

var f, buildIndex, buildTasks, themesTotal, cssThemes;

f = false;
buildIndex = 0;
buildTasks = [];
cssThemes = [];

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
      console.log(colors.yellow(title.trim() + ': ') + message.trim());
    } else {
      console.log(colors.yellow(title.trim()));
    }
  }
};

var message = function(message, force) {
  if (force !== undefined && force || f.frontsize.verbose !== undefined && f.frontsize.verbose >= 2) {
    console.log(message);
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
  report = f.test.stylestats ? theme.stylestats ? true : false : false;
  test = f.test.csslint ? theme.csslint ? true : false : false;

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
    if (buildIndex === 0 && index > 0 ) {
      messageVerbose('');
    }
    message('Theme name: ' + colors.blue(name));

    if (themesTotal >= 1) {
      messageVerbose('Theme task', (index + 1) + ' of ' + themesTotal);
    }
    messageVerbose('File', destinationPath + file);
    cssThemes.push(destinationPath + file);
    return gulp.src(compile)
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      .pipe(concat(file))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(destinationPath));
  });

  if (test) {
    gulp.task(task.test, tasksList(theme, testTasks), function () {
      messageVerbose('');
      message('CSSlint', file);
      messageVerbose('Testing theme', name);
      // run(tasksList(theme, testTasks));
      return gulp.src(destinationPath + file)
        .pipe(csslint(f.test.csslint))
        .pipe(csslint.reporter());
    });
  } else {
    reportTasks = testTasks;
  }

  if (report) {
    gulp.task(task.report, [task.css], function () {
      messageVerbose('');
      message('Stylestats', file);
      messageVerbose('Report for theme', name);
      //run(tasksList(theme, reportTasks));
      return gulp.src(destinationPath + file)
        .pipe(stylestats({
          type: 'md',
          config: f.test.stylestats
        }));
    });
  }

  if (images) {
    gulp.task(task.images, function () {
      messageVerbose('Copy theme images', f.paths.images + name);
      return gulp.src(images)
        .pipe(gulp.dest(f.paths.images + name));
    });
  }

  if (fonts) {
    gulp.task(task.fonts, function () {
      messageVerbose('Copy theme fonts', f.paths.fonts + name);
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
  message('', true);
  message(colors.red('  G R I N D E R   0.0.11'), true);
  message('', true);
  for (var t = 0; t < f.frontsize.themes.length; t += 1) {
    addTask(f.frontsize.themes[t], t);
  }
}

gulp.task('frontsize:vendors:fonts', function () {
  if (f.vendors !== undefined && f.vendors.fonts !== undefined) {
    messageVerbose('');
    message('Copying fonts from vendors');
    var i = 0;
    for (i = 0; i < f.vendors.fonts.length; i += 1) {
      messageVerbose('Font vendor', f.vendors.fonts[i]);
    }
    return gulp.src(f.vendors.fonts)
      .pipe(gulp.dest(f.paths.fonts));
  } else {
    messageVerbose('Notice', 'Vendor\'s Fonts not found, skipping task');
    return gulp;
  }
});

gulp.task('frontsize:vendors:images', function () {
  if (f.vendors !== undefined && f.vendors.images !== undefined) {
    messageVerbose('');
    message('Copying images from vendors');
    var i = 0;
    for (i = 0; i < f.vendors.images.length; i += 1) {
      messageVerbose('Image vendor', f.vendors.images[i]);
    }
    return gulp.src(f.vendors.images)
      .pipe(gulp.dest(f.paths.images));
  } else {
    messageVerbose('Notice', 'Vendor\'s Images not found, skipping task');
    return gulp;
  }
});

gulp.task('frontsize:js', function () {
  if (f.js !== undefined && f.js.files !== undefined) {
    messageVerbose('');
    message('Merging JavaScript files');
    var i = 0;
    for (i = 0; i < f.js.files.length; i += 1) {
      messageVerbose('JavaScript file', f.js.files[i]);
    }
    return gulp.src(f.js.files)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat(f.js.file))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(f.paths.js));

  } else {
    messageVerbose('Notice', 'Vendor\'s JavaScript not found, skipping task');
    return gulp;
  }
});

gulp.task('js:watch', function () {
    var tasks = [
      'frontsize:js'
    ];
    run(tasks);
    var watchList = [ f.frontsize.watch ];
    if (f.js !== undefined && f.js.watch !== undefined) {
      watchList.push(f.js.watch);
    }
    return gulp.watch(watchList, tasks);
});

gulp.task('frontsize:vendors', function () {
  var tasks = [
    'frontsize:vendors:css',
    'frontsize:vendors:fonts',
    'frontsize:vendors:images'
  ];
  run(tasks);
});

gulp.task('frontsize:vendors:css', function () {
  if (f.vendors !== undefined && f.vendors.css !== undefined) {
    messageVerbose('');
    message('Merging CSS vendors');
    var i = 0;
    for (i = 0; i < f.vendors.css.files.length; i += 1) {
      messageVerbose('CSS vendor', f.vendors.css.files[i]);
    }
    messageVerbose('CSS vendors merged to file', f.paths.css + f.vendors.css.file);
    return gulp.src(f.vendors.css.files)
      .pipe(uglifyCss())
      .pipe(concat(f.vendors.css.file))
      .pipe(gulp.dest(f.paths.css));
  } else {
    messageVerbose('Notice', 'Vendor\'s CSS not found, skipping task');
    return gulp;
  }
});

gulp.task('frontsize:merge:css', buildTasks.concat(['frontsize:vendors:css']), function () {
  if (f.vendors !== undefined && f.vendors.css !== undefined) {
    messageVerbose('');
    message('Merging all CSS files');
    messageVerbose('CSS to merge', f.paths.css + f.vendors.css.file);
    for (var i = 0; i < cssThemes.length; i += 1) {
      messageVerbose('CSS to merge', cssThemes[i]);
    }
    var css = [f.paths.css + f.vendors.css.file].concat(cssThemes);
    return gulp.src(css)
      .pipe(uglifyCss())
      .pipe(concat(f.frontsize.file))
      .pipe(gulp.dest(f.paths.css));
  } else {
    messageVerbose('Notice', 'CSS vendors not found, skipping merge');
    return gulp;
  }
});

gulp.task('frontsize:merge', ['frontsize:merge:css']);

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
  // 'frontsize:js'
  // 'frontsize:vendors'
  var tasks = [
    'frontsize:vendors',
    'frontsize:js',
    'frontsize:merge'
  ];
  run(buildTasks.concat(tasks));
});

gulp.task('default', function(){
  run('frontsize:build');
});
