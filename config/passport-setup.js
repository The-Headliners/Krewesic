const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//const keys = require('./keys');
const {User} = require('../db');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    //options for google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {

    User.findOne({ where: { googleId: profile.id } })
      .then(currentUser => {
        if (currentUser) {

          
          //user already exists
          done(null, currentUser);
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            picture: null
          })
            .then(newUser => {
              done(null, newUser);
            });
        }
      });
  })
);
