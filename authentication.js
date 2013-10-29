// authentication 

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user');

passport.use(new LocalStrategy({
    usernameField: 'username'
  },
  function(username, password, done) {
    User.authenticate(username, password, function(err, user, message) {
      return done(err, user, message);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;

