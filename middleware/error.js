var HttpResponseError = require('../lib/error').HttpResponseError;

module.exports = function() {
  return function(err, req, res, next){

    if (err instanceof HttpResponseError) {
      return res.send(err.status, {
        type: err.name,
        message: err.message
      });
    }

    if (err instanceof Error) {
      if (err.name === 'ValidationError') {
        return res.send(400, {
          type: 'ValidationError',
          message: err.message,
          errors: err.errors
        });
      }
    }

    next(err);
  };
};