
/*
 * NOTIFICATIONS
 */

var UserModel = require('../models/User.js');
var ReflectionModel = require('../models/Reflection.js');
var error = require('../lib/error');

exports.sendReflection = function(req, res, next){
  UserModel.find(function(err, users){
  if (err) { return next(error); }

    ReflectionModel.getReflection(req.params.reflectionId, function(err, reflection){
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

  var nodemailer = require("nodemailer");

  var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "citanienadnes@gmail.com",
        pass: "userpass"
    }
  });

  var mailOptions = {
    from: "Chlieb nás každodenný <citanienadnes@gmail.com>",
    to: "citanienadnes@gmail.com",
    bcc: "citanienadnes@gmail.com",
    subject: "Chlieb náš každodenný",
    html: reflection.html
  };

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