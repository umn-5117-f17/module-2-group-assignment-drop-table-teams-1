const debug = require('debug')('app:auth');

const db = require('./routes/db');

const express = require('express');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

debug(`auth0: domain=${process.env.AUTH0_DOMAIN}`)

// console.log(process.env.AUTH0_DOMAIN);
// console.log(process.env.AUTH0_CLIENT_ID);
// console.log(process.env.AUTH0_CLIENT_SECRET);
// console.log(process.env.AUTH0_CALLBACK_URL);

passport.use(new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    // debug("auth0 strategy callback; profile: " + JSON.stringify(profile, null, 4));
    return done(null, profile);
  }
));

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  // debug("auth0 serialize user: " + JSON.stringify(user, null, 4));
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // debug("auth0 deserialize user: " + JSON.stringify(user, null, 4));
  done(null, user);
});

// login/logout routes

var router = express.Router();

// session login and redirect to homepage
router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    audience: 'https://' + process.env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid profile'
  }),
  function(req, res, err) {
    res.redirect('/');
  }
);

// session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    var user = req.user;
    console.log(req.user);
    req.db.collection('Users').find().forEach(console.log);
    console.log('done');
    res.redirect(req.session.returnTo || '/');
  }
);

//The following creates a user JSON object in the database.
var create = function(req, user) {
  var userObj = {
    'userId' : user._json.sub,
    'profilePic': user.picture,
    // 'name': user.name.givenName + ' ' + user.name.familyName
    'name' : user.nickname
    // title:
    // focusArea:
    // project_Id: [

    // ]
    // cumRating:
  };
  var db = req.db.collection('Users');
  db.findOne({'userId': user._json.sub}).then(
    function(results){
      if(results == null){
        db.insertOne(userObj);
        console.log('New User Created');
        res.status(200).send('success');
      }else {
        console.log('User already exists');
      }
    }
  );
};

//The following retrieves a user JSON object from the database.
var read = function(req, user) {
  var db = req.db.collection('Users');
  db.findOne({'userId': user._json.sub}).then(
    function(results){
      if(results){
        console.log(results);
      } else {
        console.log('User not found');
      }
    }
  );
};

//The following updates a user JSON object in the database.
var update = function(req, user) {
  var db = req.db.collection('Users');
  // var query = req.body;
  //use the information of the body above to update ALL fields of a given user.
  //TODO change the update to do something meaningful that isn't set 'name' to michael
  db.findOneAndUpdate({'userId': user._json.sub}, {$set : {'name': 'Michael'}});
  console.log('User profile has been updated.');
};

//The following deletes a user JSON object from the database.
var deleteUser = function(req, user) {
  var db = req.db.collection('Users');
  db.deleteOne({'userId' : user._json.sub});
  // db.deleteMany({'name' : 'Michael'}).then(function(results){
    // console.log('User profile has been deleted');
  // });
};
module.exports.router = router;
