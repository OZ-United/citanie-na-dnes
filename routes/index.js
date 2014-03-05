
/*
 * GET home page.
 */

var ReflectionModel = require('../models/Reflection.js');
var ejs = require('ejs');

exports.index = function(req, res, next){

  ReflectionModel
  .find()
  .sort('-date')
  .limit(1)
  .exec(function(err, reflections){
    if (err) { return next(error); }
    res.render('index', { reflections: reflections, home: true});
  });
};

exports.history = function(req, res, next){

  var query = {};
  if (req.query.date) {
    var date = new Date(req.query.date);
    query.date = {
      '$gte': date,
      '$lte': new Date(date.getTime() + (24 * 60 * 60 * 1000))
    };
  }
  else if (req.query.start || req.query.end) {
    query.date = {
      '$gte': req.query.start ? new Date(req.query.start) : new Date(0),
      '$lte': req.query.end ? new Date(req.query.end) : new Date()
    };
  }
  console.log(query);

  ReflectionModel
  .find(query)
  .sort('-date')
  .exec(function(err, reflections){
    if (err) { return next(error); }
    res.render('index', { reflections: reflections, home: false });
  });
};


exports.dashboard = function(req, res, next){
  res.render('dashboard');
};