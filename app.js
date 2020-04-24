var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var passport = require('passport');
const config = require('./configs/config');




//var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var authsRouter = require('./routes/auths');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var managersRouter = require('./routes/managers');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
//app.use(auth.passport.session());

app.use('/', indexRouter);
app.use('/auths', authsRouter);

//middleware

app.use(verifyJWT = (req,res,next)=> {
  const token = req.headers['x-access-token']
  if (token){
    jwt.verify(token, config.jwt_secret, function(err,decoded){
      if(err) {
        return res.status(401).json({"error":true, "message": "unauthorized access."});
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      "error": true,
      "message": "No token provided"
    });
  }
})
app.use('/users', usersRouter);
app.use('/tasks',tasksRouter);
app.use('/managers',managersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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