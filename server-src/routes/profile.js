const express = require('express')
const router = express.Router();
const isAuthenticated = require('../middlewares/is-authenticated');

module.exports = () => {
  router.get('/', isAuthenticated, (req, res) => {
    const user = req.user;
    res.render('profile.ejs', {
      user : user
    });
  });

  return router;
}
