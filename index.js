'use strict';

const defaults = require('defaults'),
  Handlebars = require('handlebars'),
  fs = require('fs'),
  path = require('path'),
  glob = require('glob');

module.exports = function (options) {
  options = defaults(options, {
    directory: 'partials',
    pattern: '.hbs'
  })
  return function (files, metalsmith, done) {
    let basedir = metalsmith.path(options.directory) + '/';
    let fullPath = basedir + '**/*' + options.pattern;
    glob(fullPath, function (err, files) {
      if (err) {
        return done(err)
      }
      
      files.forEach(file => {
        fs.readFile(file, 'utf8', function (err, contents) {
          if (err) {
            return done(err)
          }
          let id = file.replace(basedir, '').replace(path.extname(file), '').replaceAll('/', '-');
          
          Handlebars.registerPartial(id, contents)
          done();
        });
      });
    });
  }
};
