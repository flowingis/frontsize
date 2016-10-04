var fs = require('fs');
var colors = require('colors');
var exec = require('shelljs').exec;

exports.test = function(searchTerm) {
  var fileLocation = 'test/css/frontsize.test.css';
  fs.readFile(fileLocation, function (err, data) {
    if (err) throw err;
    console.log('');
    if (data.indexOf(searchTerm) > -1) {
      console.log('Test:\n', searchTerm, '\nSUCCESS');
    } else {
      console.log(colors.red('Test:'));
      console.log(colors.red(searchTerm));
      console.log(colors.red('ERROR: String not found in ' + fileLocation));
      process.exit();
    }
  });
};

exports.run = function(scripts) {
  for (var i = 0; i < scripts.length; i++) {
    exec('node ' + scripts[i]);
  }
};
