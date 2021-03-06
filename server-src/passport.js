const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const {userService} = require('./services');
const { async, await } = require('asyncawait');
const config = require('../config.json');

passport.use(new FacebookStrategy({
  clientID: config.facebookApp[process.env.NODE_ENV].clientId,
  clientSecret: config.facebookApp[process.env.NODE_ENV].clientSecret,
  callbackURL: config.facebookApp[process.env.NODE_ENV].callbackUrl,
  profileFields: config.facebookApp[process.env.NODE_ENV].profileFields
},
  async((accessToken, refreshToken, profile, done) => {
    try {
      const user = await(userService.findOrCreateFacebook(profile));
      return done(null, user);
    } catch(error) {
     return done(error); 
    }
  })
));

if(process.env.NODE_ENV === 'development') {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async(function(username, password, done) {
    try {
      const user = await(userService.findOne({ 
        query : {
          email : 'admin@admin.com' 
        },
        select :  null
      }));
      return done(null, user)
    } catch(error) {
      return done(error)
    }
})));
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async((id, done) => {
  try {
    const user = await(userService.findOne({ 
      query : {
        _id : id
      },
      select : 'displayName profilePicUrl bookmarkedBoards'
    }));
    return done(null, user)
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;
