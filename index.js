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
    glob(options.directory + '/**/*' + options.pattern, function (err, files) {
      if (err) {
        return done(err)
      }
      files.forEach(file => {
        //onFile(f, options.directory, done);
        fs.readFile(file, 'utf8', function (err, contents) {
          if (err) {
            return done(err)
          }
          let id = file.replace(options.directory + '/', '').replace(path.extname(file), '').replace('/', '-');
          Handlebars.registerPartial(id, contents)
          done()
        });
      });
    });
  }
};
