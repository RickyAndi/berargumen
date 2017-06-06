const express = require('express')
const router = express.Router();
const passport = require('../passport');
const { isNotAuthenticated, isAuthenticated  } = require('../middlewares');

module.exports = () => {
  router.get('/logout', isAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.get('/facebook',  isNotAuthenticated, passport.authenticate('facebook', {
    scope : ['public_profile', 'email']
  }));

  router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect : '/',
  }), (req, res) => {
    res.redirect('/')
  });
  
  if(process.env.NODE_ENV === 'development') {
    router.get('/local', (req, res, next) => {
      req.body = {
        username : 'jancok',
        password: 'jancok'
      }
      passport.authenticate('local', { failureRedirect : '/'})(req, res, next);
    },(req, res, next) => {
      res.redirect('/');
    });
  }
  
  return router;
};
