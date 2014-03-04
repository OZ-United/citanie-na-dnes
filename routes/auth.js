var error = require('../lib/error');
var HASH;

exports.login = function(req, res, next){
  if (req.body.password === process.env.PASSWORD) {
    HASH = Math.random().toString(31).slice(2);
    res.json({hash: HASH});
  }
  else {
    return next(new error.Forbidden());
  }
};

exports.checkHash = function(req, res, next){
  if (HASH === req.body.hash) {
    return next();
  }
  else {
    return next(new error.Forbidden());
  }
  
};