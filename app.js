const config = require('./config/secrets');
const google = require('googleapis');

/*
 * DB
*/
const dbDeets = require('./config/db');
const db = require('monk')(dbDeets.conn);
const Users = db.get('users');
// Implement MongoStore.
// https://github.com/kcbanner/connect-mongo
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


/*
 * Auth Providers
*/
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: config.google.calendar.clientId,
    clientSecret: config.google.calendar.clientSecret,
    callbackURL: config.google.redirectUrl
  },
  function(accessToken, refreshToken, profile, cb) {
    debugger;
    Users.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// TODO:
// debug these lines.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*
 * Web App vars
*/
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

/*
 * Utils
*/
const dateUtil = require('./utils/dateHelpers.js');
const cuid = require('cuid');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, 'public')))
  .use(session({
      name: 'session',
      resave: false, // https://github.com/expressjs/session#resave
      secret: cuid(),
      store: new MongoStore({
        url: dbDeets.sessionsStore
      })
    })
  );

// TODO:
// https://github.com/passport/express-4.x-facebook-example/blob/master/server.js




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/*
 * Error handlers.
*/

// development error handler
// will print stacktrace
if (app.get('env') === 'DEV') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
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
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;