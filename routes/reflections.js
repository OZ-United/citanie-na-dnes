
/*
 * REFLECTIONS
 */

var ReflectionModel = require('../models/Reflection.js');
var error = require('../lib/error');

exports.fetch = function(req, res, next){

  var fs = require("fs");
  var jquery = fs.readFileSync(process.cwd() + "/lib/jquery.js", "utf-8");

  ReflectionModel.getTodayReflection(function(err, reflection){
    console.log('reflection', err, reflection);
    if (err) { return next ? next(errors) : false; }
    if (! reflection) {

      var curl = require('curlrequest');
      var options = { url: 'http://baptist.sk/chlieb-nas-kazdodenny' };

      curl.request(options, function (err, data) {
        if (err) {
          console.log(err);
          return next ? next(err) : false;
        }

        var jsdom = require('jsdom');
        console.log('jsdom env call');
        console.log(data);

        jsdom.env(
            data, ["http://code.jquery.com/jquery.js"],
          function (errors, window) {
            if (errors) {
              console.log(errors);
              return next ? next(errors) : false;
            }
            if (!window) {
              return next ? next(new error.HttpResponseError('baptist.sk connection error')) : false;
            }

            var $ = window.$;
            var articleDOM = window.$("#chlieb table div").remove(".dateselector");

            var reflection = {};
            reflection.html = $(articleDOM[0]).html();

            var offset = 0;
            if (!$($(articleDOM[0]).find('strong')[0]).text().length) {
              offset = 1;
            }
            reflection.strdate = $($(articleDOM[0]).find('strong')[0 + offset]).text().replace(/(\s)/g, ' ').trim();
            reflection.title = $($(articleDOM[0]).find('strong')[1 + offset]).text().replace(/(\s)/g, ' ').trim();
            reflection.thought = $($(articleDOM[0]).find('strong')[2 + offset]).text().replace(/(\s)/g, ' ').trim();
            console.log(reflection);
            new ReflectionModel(reflection).save(function(err, reflection){
              if (err) {
                if (err.code == 11000 || err.code == 11001) {
                  return next(new error.DuplicateIndex('Reflection already exists.'));
                }
                else {
                  console.log(err);
                  return next ? next(err) : false;
                }
              }
              req && res && res.json(reflection);
            });
        });
      });
    }
    else {
      return next ? next() : false;
    }
  });
};

exports.query = function(req, res, next){
  ReflectionModel.find(function(err, reflections){
    if (err) { return next(error); }
    res.json(reflections);
  });
};

exports.get = function(req, res, next){
  ReflectionModel.findById(req.params.reflectionId, function(err, reflection){
    if (err) { return next(error); }
    if (! reflection) { return next(new error.NotFound('Reflection does not exist.')); }
    res.json(reflection);
  });
};

exports.remove = function(req, res, next){
  ReflectionModel.findById(req.params.reflectionId, function(err, reflection){
    if (err) { return next(error); }
    if (! reflection) { return next(new error.NotFound('Reflection does not exist.')); }
    reflection.remove(function(err, reflection){
      if (err) return next(err);
      res.send(204);
    });
  });
};
