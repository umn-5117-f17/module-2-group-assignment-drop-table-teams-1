const debug = require('debug')('app:startup');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressMongoDb = require('express-mongo-db');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const _ = require('lodash');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const auth = require('./auth');
const user = require('./user');

const index = require('./routes/index');
const db = require('./routes/db');
const upload = require('./routes/upload');
const api = require('./routes/api');
const project = require('./routes/project');
// const profile = require('./routes/profile');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressMongoDb(process.env.DB_URI));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ url: process.env.DB_URI }),
    resave: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 1000
    },
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // always make req.user available to the template
  res.locals.user = req.user;
  next();
});

app.use('/', index);
app.use('/', auth.router);
app.use('/db', db);
app.use('/upload', upload);
app.use('/api', api);
app.use('/project',project);
// app.use('/profile',profile)
app.get('/protected', ensureLoggedIn('/login'), function(req, res, next) {
  res.redirect('/');
});
app.use('/account', user);

app.get('/upload', ensureLoggedIn('/login'), function(req, res, next) {
  res.render('upload', {
    scripts: ['file-upload.js'],
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

debug(`app.js loaded`);

module.exports = app;
