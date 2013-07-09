
/*
 * NOTIFICATIONS
 */

var UserModel = require('../models/User.js');
var ReflectionModel = require('../models/Reflection.js');
var error = require('../lib/error');
var nodemailer = require("nodemailer");

exports.sendReflection = function(req, res, next){
  UserModel.find(function(err, users){
  if (err) { return next(error); }

    var reflectionId;

    if (req && req.params) {
      reflectionId = req.params.reflectionId;
    }

    ReflectionModel.getReflection(reflectionId, function(err, reflection){
      if (err) { return next(error); }
      if (! reflection) { return next(new error.NotFound('Reflection does not exist.')); }

      sendEmail(users, reflection);
      res && res.send(200);

    });
  });
};

exports.sendTodayReflection = function(req, res, next){
  UserModel.find(function(err, users){
  if (err) { return next(error); }

    ReflectionModel.getTodayReflection(function(err, reflection){
      if (err) { return next(error); }
      if (! reflection) { return next(new error.NotFound('Reflection for today does not exist.')); }

      sendEmail(users, reflection);
      res && res.send(200);

    });
  });
};

var sendEmail = function(users, reflection){

  if (!users.length) {
    return false;
  }

  var emailaddresses = users[0].email;
  for (var i=1; i<users.length;i++) {
    emailaddresses += ', ' + users[i].email;
  }

  var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
      user: process.env.EMAIL || "citanienadnes@gmail.com",
      pass: process.env.PASS || "password"
    }
  });

  var mailOptions = {
    from: "Čítanie na dnes <citanienadnes@gmail.com>",
    to: "citanienadnes@gmail.com",
    bcc: emailaddresses,
    subject: "Chlieb náš každodenný",
    html: reflection.html
  };

  console.log(mailOptions);

  smtpTransport.sendMail(mailOptions, function(error, response){
    if (error){
        console.log(error);
    }
    else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
  });

};