
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * MONGODB CONNECTION
 */

mongoose.connect('mongodb://localhost/citanie-na-dnes');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error:'));
db.once('open', function callback () {
	console.log('Mongo connection opened');
});

/**
 * HTTP SERVER AND ROUTES
 */

var routes = require('./routes');
var reflections = require('./routes/reflections');

app.get('/', routes.index);
app.get('/reflections/fetch', reflections.fetch);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * CRON JOB
 */

// var newReflection = require('cron').CronJob;
// new newReflection('0 0 */1 * * *', function(){
// 	reflections.fetch();
// }, null, true, "Europe/Bratislava");
