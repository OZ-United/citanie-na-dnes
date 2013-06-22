
/*
 * REFLECTIONS
 */

var ReflectionModel = require('../models/Reflection.js');

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
        if (err) return next(err);
        console.log(reflection);
        req && res && res.json(reflection);
      });

    }
  );
};