
/*
 * GET home page.
 */

var ReflectionModel = require('../models/Reflection.js');
var ejs = require('ejs');

exports.index = function(req, res, next){

  ReflectionModel
  .find()
  .sort('-date')
  .exec(function(err, reflections){
    if (err) { return next(error); }
    var title = [];
    if (req.query.all) {
    	title = reflections;
    }
    else if (reflections.length) {
    	title.push(reflections[0]);
    }

    res.render('index', { reflections: title });
  });
};