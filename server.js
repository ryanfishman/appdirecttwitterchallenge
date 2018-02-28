var spawn = require('child_process').spawn;
var proxy = require('express-http-proxy');

spawn('twitter-proxy');

var express = require('express');
var app = express();

var _ = require('underscore');

app.use('/js',  express.static(__dirname + '/public/js'));
app.use('/css',  express.static(__dirname + '/public/css'));
app.use('/images',  express.static(__dirname + '/public/images'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/', express.static(__dirname + '/public'));

app.use('/api/twitter', proxy('http://localhost:7890'));

var port = 3005

app.listen(port, "0.0.0.0");
console.log('Listening on port ' + port);
console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=appdirect');
