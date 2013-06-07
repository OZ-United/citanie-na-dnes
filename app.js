var jsdom = require("jsdom");
var querystring = require('querystring');
var http = require('http');

var article = '';
var post_data;
var post_options;
var post_req;

var sendMail = function(article) {
	console.log('send mail');
	post_data = querystring.stringify({
		'article' : article
	});

	post_options = {
		host: 'www.example.com',
		port: '80',
		path: '/baptist/mail.php',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': post_data.length
		}
	};

	post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
		});
	});

	post_req.write(post_data);
	post_req.end();
};

jsdom.env(
	"http://baptist.sk/chlieb-nas-kazdodenny",
	["http://code.jquery.com/jquery.js"],
	function (errors, window) {
		var $ = window.$;

		var articleDOM = window.$(".mainbody table div");
		article = $(articleDOM[0]).html();

		console.log(article);
		sendMail(article);
	}
);

var port = process.env.PORT || 3000;
console.log(port);
http.createServer(function (req, res) {
	res.writeHead(200);
	var html = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"></head><body>' + article + '</body></html>';
	res.end(html + "\n");
}).listen(port);