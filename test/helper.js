require('colors');
var exec = require('shelljs').exec;
var sass = require('node-sass');

var checkString = function(searchTerm, cssData) {

  if (cssData.indexOf(searchTerm) > -1) {
    process.stdout.write('.');
  } else {
    process.stdout.write('\033[31mF');
    console.log('\nTest failed on file: ' + process.mainModule.filename);
  }
};

var cleanCss = function(css) {
  var re = /(^\/\*)(.|[\r\n])*(\*\/$)/gm;
  return css.replace(re, '').trim();
};

exports.test = function(test) {
  var result = sass.renderSync({
    data: '@import "test/import";' + test.expect.trim(),
    outputStyle: 'expanded'
  });
  checkString(test.toBe.trim(), cleanCss(result.css.toString('utf8')));
};

exports.ctest = function(test) {
  var result = sass.renderSync({
    data: '@import "test/import";' + test.expect.trim(),
    outputStyle: 'expanded'
  });
  console.log('\n\n' + cleanCss(result.css.toString('utf8')));
  process.exit(1);
};

exports.run = function(scripts) {
  for (var i = 0; i < scripts.length; i += 1) {
    exec('node ' + scripts[i]);
  }
  console.log('');
};
