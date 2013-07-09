
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var ltld = require('local-tld-update');

var app = express();

// all environments
app.set('port', process.env.PORT || 0);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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
var users = require('./routes/users');
var notifications = require('./routes/notifications');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.get('/', routes.index);
app.get('/reflections/fetch', reflections.fetch);
app.get('/reflections', reflections.query);
app.get('/reflections/:reflectionId', reflections.get);
app.delete('/reflections/:reflectionId', reflections.remove);

app.get('/users', users.query);
app.post('/users', users.create);
app.put('/users/:userId', users.query);
app.delete('/users/:userId', users.remove);

app.post('/notifications/reflections/last', notifications.sendReflection);
app.post('/notifications/reflections/:reflectionId', notifications.sendReflection);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + server.address().port);
  ltld.update("citanie-na-dnes", server.address().port);
});

/**
 * CRON JOB
 */

var newReflection = require('cron').CronJob;
new newReflection('0 0 3 * * *', function(){
	reflections.fetch();
}, null, true, "Europe/Bratislava");

var newNotification = require('cron').CronJob;
new newNotification('0 0 5 * * *', function(){
	notifications.sendReflection();
}, null, true, "Europe/Bratislava");
