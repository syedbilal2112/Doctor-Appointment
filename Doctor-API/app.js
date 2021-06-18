const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const compression = require('compression');
const helmet = require('helmet');

const app = express();
const db = require('./app/models/db');
db.dbInit();
// Setting cors
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');

  next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true,
  parameterLimit: 500000
}));
app.use(compression());
app.use(helmet());
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'temp')));
app.use('/files', express.static('uploads'));

const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.get('/', function (req, res) {
  res.render('pages/auth');
});

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use('/auth', require('./app/controller/authController'));
app.use('/cloud', require('./app/controller/cloudApiController'));

var moment = require('moment');
app.locals.moment = moment;
//Index Route
// app.get('/', function (req, res) {
//     res.send('invalid rest point');
// })

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// })


/*  Google AUTH  */

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '195313191269-c1eg8po36n9bibf58f4ahelbh4i93n62.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'MIN6J604yGXRp-hYfhb9koGc';
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    res.redirect('/success');
  });

module.exports = app;