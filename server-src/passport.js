const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/user');
const { async, await } = require('asyncawait');
const config = require('../config.json');

passport.use(new FacebookStrategy({
  clientID: config.facebookApp.clientId,
  clientSecret: config.facebookApp.clientSecret,
  callbackURL: config.facebookApp.callbackUrl,
  profileFields: config.facebookApp.profileFields
},
  async((accessToken, refreshToken, profile, done) => {
    try {
      const user = await(User.findOrCreateFacebook(profile));
      return done(null, user);
    } catch(error) {
     return done(error); 
    }
  })
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async((id, done) => {
  try {
    const user = await(User.findOne({ _id : id }, 'displayName'));
    return done(null, user)
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;
