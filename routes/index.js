
/*
 * GET home page.
 */

var ReflectionModel = require('../models/Reflection.js');
var ejs = require('ejs');

exports.index = function(req, res, next){

  ReflectionModel.getReflection(null, function(err, reflection){
    if (err) { return next(error); }
    if (! reflection) { return next(new error.NotFound('Reflection does not exist.')); }

    var html;
    if (reflection) {
      html = reflection.html;
    }

    res.render('index', { reflection: html });

  });
};