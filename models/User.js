var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');

var UserModelSchema = new Schema({
  email:  { type: String, index: { unique: true, sparse: true }, required: true, lowercase: true, trim: true},
  name:   { type: String }
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

UserModelSchema.virtual("userId").get(function(){
  return this.id;
});

UserModelSchema.virtual("gravatar").get(function(){
  var hash = crypto.createHash('md5').update(this.email).digest("hex");
  return 'http://gravatar.com/avatar/' + hash + '?s=50&d=mm';
});

module.exports = mongoose.model('UserModel', UserModelSchema);