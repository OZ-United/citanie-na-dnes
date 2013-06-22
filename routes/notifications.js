
/*
 * NOTIFICATIONS
 */

var UserModel = require('../models/User.js');
var ReflectionModel = require('../models/Reflection.js');
var error = require('../lib/error');

exports.sendReflection = function(req, res, next){
  UserModel.find(function(err, users){
  if (err) { return next(error); }

    ReflectionModel.getReflection(function(err, reflection){
      if (err) { return next(error); }
      if (! reflection) { return next(new error.NotFound('Reflection does not exist.')); }

      sendEmail(users, reflection);
      res.send(200);

    });
  });
};

var sendEmail = function(users, reflection){
  console.log(users);
  console.log(reflection);
};