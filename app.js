
// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var favicon = require('serve-favicon');
//var logger = require('morgan');
var path = require('path');
var flash    = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

var configDB = require('./config/database.js');

var mongoose = require('mongoose');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var watson = require('watson-developer-cloud');

var app = express();


app.set('port', port);
var server = app.listen(app.get ('port'), function() {
    console.log('NODE JS APPLICATION LISTING TO PORT: ' + port);
});


/****************** GLOBAL ACCESS MODULE  ******************/
GLOBAL.mongoose = require('mongoose');

/******************** END OF PACKAGE DEFINED ************************/

//######################## IBM INSIGHT #####################

GLOBAL.personality_insights = watson.personality_insights({
  username: '90b4e1c3-ee0d-41ea-9ac7-ae9c78d4c182',
  password: 'PZAz67oX1qaU',
  version: 'v2'
});


// configuration ===============================================================
mongoose.connect(configDB.url, function(err, db) {
  if(!err) {
    console.log("MONGO CONNECTED");
  } else {
      console.log("ERROR MONGO  :: "+err);
  }
});// connect to our database


/************* DEFINE MODULE ******************/
var routes = require('./routes/index');
// var routes = require('./routes/index');
var users = require('./routes/users');
var customer = require('./routes/customer');
var lender = require('./routes/lender');

/**************END OF MODULE  *********************/

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
    secret: 'hackathon',
    resave: true,
    saveUninitialized: true
 })); // session secret

app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(path.join(__dirname, 'public')));


/******************** APP USE ROUTES **************************/
app.use('/', routes);
app.use('/users', users);
app.use('/customer', customer);
app.use('/lender', lender);

/******************** END APP USE ROUTES **************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log("----- ERROR OBJECT: " + JSON.stringify(err) + " ------");
  console.log("----- ERROR MESSAGE: " + err.message + " ------");
  console.log("----- REQUEST URL: " + req.url + " ------");
  res.render('error', {
      message: err.message,
      error: err
  });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log("----- ERROR OBJECT: " + JSON.stringify(err)+"---------");
  console.log("----- ERROR MESSAGE: " + err.message+ "-----------");
  console.log("----- REQUEST URL: " + req.url + "--------");
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
