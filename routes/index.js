
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

    res.render('index', { reflections: reflections });
  });
};