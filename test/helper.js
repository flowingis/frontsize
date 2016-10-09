var fs = require('fs');
require('colors');
var exec = require('shelljs').exec;
var sass = require('node-sass');
var diff = require('node-diff');



var currCol = 0;
var maxCols = 10;

var checkString = function(searchTerm, cssData) {
  currCol += 1;
  var returnChar = '';
  if (currCol === maxCols) {
    returnChar = '\n';
    currCol = 0;
  }

  if (cssData.indexOf(searchTerm) > -1) {
    process.stdout.write('.');
  } else {
    process.stdout.write('\033[31mF' + returnChar);
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

exports.check = function(test) {
  var result = sass.renderSync({
    data: '@import "test/import";' + test.expect.trim(),
    outputStyle: 'expanded'
  });
  console.log(cleanCss(result.css.toString('utf8')));
  process.exit();
};

exports.run = function(scripts) {
  for (var i = 0; i < scripts.length; i += 1) {
    exec('node ' + scripts[i]);
  }
  console.log('');
};
