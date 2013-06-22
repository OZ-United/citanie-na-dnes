
/*
 * REFLECTIONS
 */

var ReflectionModel = require('../models/Reflection.js');
var error = require('../lib/error');

exports.fetch = function(req, res, next){
  var jsdom = require("jsdom");

  jsdom.env(
    "http://baptist.sk/chlieb-nas-kazdodenny",
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
      var $ = window.$;

      var articleDOM = window.$(".mainbody table div");

      var reflection = {};
      reflection.html = $(articleDOM[0]).html();
      reflection.strdate = $($(articleDOM[0]).find('strong')[0]).text().replace(/(\s)/g, ' ').trim();
      reflection.title = $($(articleDOM[0]).find('strong')[1]).text().replace(/(\s)/g, ' ').trim();
      reflection.thought = $($(articleDOM[0]).find('strong')[2]).text().replace(/(\s)/g, ' ').trim();

      new ReflectionModel(reflection).save(function(err, reflection){
        if (err) {
          if (err.code == 11000 || err.code == 11001) {
            return next(new error.DuplicateIndex('Reflection already exists.'));
          }
          else {
            return next(err);
          }
        }
        console.log(reflection);
        req && res && res.json(reflection);
      });

    }
  );
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