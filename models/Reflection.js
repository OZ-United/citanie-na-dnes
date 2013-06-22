var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var error = require('../lib/error');

var ReflectionModelSchema = new Schema({
  html:     { type: String, required: true},
  strdate:  { type: String, required: true},
  date:     { type: Date, default: Date.now },
  title:    { type: String, required: true},
  thought:  { type: String, required: true}
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

ReflectionModelSchema.virtual("reflectionId").get(function(){
  return this.id;
});

module.exports = mongoose.model('ReflectionModel', ReflectionModelSchema);