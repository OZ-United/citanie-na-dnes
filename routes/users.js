
/*
 * USERS
 */

var UserModel = require('../models/User.js');
var error = require('../lib/error');

exports.save = function(req, res, next){
  new UserModel(req.body).save(function(err, user){
    if (err) {
      if (err.code == 11000 || err.code == 11001) {
        return next(new error.DuplicateIndex('User with this email already exists.'));
      }
      else {
        return next(err);
      }
    }
    console.log(user);
    res.json(user);
  });
};

exports.query = function(req, res, next){
  UserModel.find(function(err, users){
    if (err) { return next(error); }
    res.json(users);
  });
};

exports.edit = function(req, res, next){
  UserModel.findById(req.params.userId, function(err, user){
    if (err) { return next(error); }
    if (!user) { return next(new error.NotFound('User does not exist.')); }

    user.email = req.body.email;
    user.name = req.body.name;

    user.save(function(err, user){
      if (err) {
        if (err.code == 11000 || err.code == 11001) {
          return next(new error.DuplicateIndex('User with this email already exists.'));
        }
        else {
          return next(err);
        }
      }
      console.log(user);
      res.json(user);
    });
 
  });
};

exports.create = function(req, res, next){
  var user = {};
  user.name = req.body.name;
  user.email = req.body.email;

  new UserModel(user).save(function(err, user){
    if (err) {
      if (err.code == 11000 || err.code == 11001) {
        return next(new error.DuplicateIndex('User with this email already exists.'));
      }
      else {
        return next(err);
      }
    }
    console.log(user);
    res.json(user);
  });
};

exports.remove = function(req, res, next){
  UserModel.findById(req.params.userId, function(err, user){
    if (err) { return next(error); }
    if (! user) { return next(new error.NotFound('User does not exist.')); }

    user.remove(function(err, user){
      if (err) return next(err);
      res.send(204);
    });
  });
};

exports.update = function(req, res, next){
  UserModel.findById(req.params.userId, function(err, user){
    if (err) { return next(error); }
    if (! user) { return next(new error.NotFound('User does not exist.')); }
    
    user.name = req.body.name;
    user.email = req.body.email;

    user.save(function(err, user){
      if (err) {
        if (err.code == 11000 || err.code == 11001) {
          return next(new error.DuplicateIndex('User with this email already exists.'));
        }
        else {
          return next(err);
        }
      }
      console.log(user);
      res.json(user);
    });
  });
};