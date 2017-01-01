var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var redisStore = require('connect-redis');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    // store: new redisStore(),
    secret: 'recommand 128 bytes random string',
    cookie: {user: "default", maxAge: 2*60*60*0},
    httpOnly: true,
    resave: true,
    saveUninitialized: true
}));

let test = require('./routes/test');
let index = require('./routes/index');
let login = require('./routes/login');
let personInfo = require('./routes/personInfo');
let route = require('./routes/route');
app.use('/test', test);
app.use('/index', index);
app.use('/login', login);
app.use('/personInfo', personInfo);
app.use('/route', route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
