const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: '399922150379625',
  clientSecret: '891556e052a9039336917de94e632e99',
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
},
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreateFacebook(profile)
      .then(function(user) {
        done(null, user);
      })
      .catch(function(error) {
        done(error);
      })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id : id})
    .then(function(user) {
      done(null, user)
    })
    .catch(function(error) {
      done(error);
    })
});

module.exports = passport;
