// dependencies
var express = require('express');
// var routes = require('./routes');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var passport = require('./authentication');
var mongoStore = require('connect-mongo')(express);
var moment = require('moment');

var app = module.exports = express();
global.app = app;

// configuration file
var config = require('./config.js');
app.locals.config = config;

// connect to the database
var DB = require('./database');
var db = new DB.startup('mongodb://localhost/'+config.dbname);

// sessions
var storeConf = {
  db: {db: config.dbname,host: 'localhost'},
  secret: config.sessionSecret
};

// import navigation links
app.locals.links = require('./navigation');

// date manipulation tool
app.locals.moment = moment;

// app config
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  // highlights top level path
  app.use(function(req, res, next) {
    var current = req.path.split('/');
    res.locals.current = '/' + current[1];
    res.locals.url = 'http://' + req.get('host') + req.url;
    next();
  });
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: storeConf.secret,
    maxAge: new Date(Date.now() + 3600000),
    store: new mongoStore(storeConf.db)
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// environment specific config
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
 app.use(express.errorHandler());
});

// load the router
require('./routes')(app);

var port = config.port;
app.listen(port, function() {
console.log("Listening on " + port);

});