var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');

var ReflectionModelSchema = new Schema({
  html:     { type: String, required: true},
  strdate:  { type: String, index: { unique: true, sparse: true }, required: true},
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

ReflectionModelSchema.statics.getReflection = function(reflectionId, cb){
  if (reflectionId) {
    this.model('ReflectionModel').findById(reflectionId, cb);
  }
  else {
    var today = new Date();
    today.setHours(0,0,0,0);
    this.model('ReflectionModel').findOne( {"date": {"$gte": today}} , cb);
  }
};

module.exports = mongoose.model('ReflectionModel', ReflectionModelSchema);