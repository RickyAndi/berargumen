const express = require('express')
const router = express.Router();
const passport = require('../passport');

module.exports = () => {
  router.get('/facebook',  passport.authenticate('facebook', {
    scope : ['public_profile', 'email']
  }))

  router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect : '/',
  }), (req, res) => {
    res.redirect('/')
  });

  return router;
};
