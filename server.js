var express = require('express');
//var flash = require('connect-flash');
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.bodyParser());
app.use(express.errorHandler());
//app.use(express.favicon(__dirname + '/public/images/favicon.ico', { maxAge: 2592000000 }));
app.use(express.logger());
//app.use(express.cookieParser('it is a secret to everybody'));
////app.use(express.session({secret: 'really what',  cookie: { maxAge: 60000 }}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/x'));

app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(PORT, function(req, res) {
  console.log('started up, oh yeah');
});
