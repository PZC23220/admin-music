var express = require('express');
var path = require('path');
// var log4js = require('log4js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer')

var app = express();
var index = require('./api')

app.set('trust proxy', true);

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// logger
// log4js.configure({
//     "appenders": [
//         { "type": 'console',"category":"console" }
//     ],
//     replaceConsole: true
// });
// var logger = log4js.getLogger('debug');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: '/tmp/h5/uploads/' }).any())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));

// init router
// app.use('/', [router, authorization, switch_splash]);
var arr2 = []
require('fs').readdirSync(__dirname + '/api/').forEach(function(file) {
  if (file.match(/.js$/) !== null && file !== 'index.js' && file !== 'connection.js' && file !== 'MySQLUtil.js') {
    var name = file.replace('.js', '');
    arr2.push(require('./api/' + file))
  }
});
app.use('/', arr2);


// catch 404 and forward to error handler
app.get('/favicon.ico', function(req, res, next) {
  res.status(404);
});
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
