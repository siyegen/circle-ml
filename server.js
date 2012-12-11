var express = require('express');
//var flash = require('connect-flash');
var app = express();
var PORT = process.env.PORT || 8080;

app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.send('moo');
});

app.listen(PORT, function(req, res) {
  console.log('started up, oh yeah');
});
