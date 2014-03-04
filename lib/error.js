var util = require('util');


function AppError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.message = message;
  this.name = this.constructor.name;
}
util.inherits(AppError, Error);


function HttpResponseError(message, statusCode) {
  AppError.call(this, message);
  this.status = statusCode || 400;
}
util.inherits(HttpResponseError, AppError);


function NotFound(message) {
  message = message || 'Not found.';
  HttpResponseError.call(this, message, 400);
}
util.inherits(NotFound, HttpResponseError);


function DuplicateIndex(message) {
  message = message || 'Duplicate index.';
  HttpResponseError.call(this, message, 400);
}
util.inherits(DuplicateIndex, HttpResponseError);

function Forbidden(message) {
  message = message || 'Forbidden.';
  HttpResponseError.call(this, message, 403);
}
util.inherits(Forbidden, HttpResponseError);


function NotAcceptable(message) {
  message = message || 'Invalid format request.';
  HttpResponseError.call(this, message, 406);
}
util.inherits(NotAcceptable, HttpResponseError);


function UnsupportedMediaType(message) {
  message = message || 'Invalid data format.';
  HttpResponseError.call(this, message, 415);
}
util.inherits(UnsupportedMediaType, HttpResponseError);


module.exports = {
  AppError: AppError,
  HttpResponseError: HttpResponseError,
  NotFound: NotFound,
  DuplicateIndex: DuplicateIndex,
  Forbidden: Forbidden,
  NotAcceptable: NotAcceptable,
  UnsupportedMediaType: UnsupportedMediaType
};