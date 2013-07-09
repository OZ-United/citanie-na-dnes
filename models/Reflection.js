var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');

var ReflectionModelSchema = new Schema({
  html:     { type: String, required: true},
  strdate:  { type: String, index: { unique: true, sparse: true }, required: true},
  date:     { type: Date, default: Date.now, index: {} },
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
    this.model('ReflectionModel')
    .find()
    .sort('-date')
    .exec(function(err, reflections) {
      if (err) {
        return cb(err);
      }

      cb(null, reflections[0]);
    });
  }
};

ReflectionModelSchema.statics.getTodayReflection = function(cb){
  var today = new Date();
  today.setHours(0,0,0,0);

  this.model('ReflectionModel')
  .find({date: {$gte: today}}, function(err, reflections) {
    if (err) {
      return cb(err);
    }
    cb(null, reflections[0]);
  });
};

module.exports = mongoose.model('ReflectionModel', ReflectionModelSchema);