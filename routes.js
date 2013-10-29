// dependencies
var passport = require('passport');
var home = require('./routes/home');

// check to see if user is logged in
function restrict(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// checks if user is an admin
function isAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.redirect('/');
  }
}

// routes
module.exports = function(app){
  app.get('/', home.index);
  app.get('/login', home.login);
  app.post('/login',
  passport.authenticate('local', {failureRedirect: '/login'}),
  function (req, res) {res.redirect('/')});
  app.get('/logout', restrict, home.logout);
  app.get('/about', home.about);
  app.get('/about/tos', home.tos);
  app.get('/register', home.getRegister);
  app.post('/register', home.postRegister);
  app.get('/checkExists', home.checkExists);
  app.get('/profile', restrict, home.profile);
};