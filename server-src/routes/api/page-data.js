const express = require('express');
const router = express.Router();

module.exports = sockets => {
  router.get('/index', (req, res, next) => {
    const data = {
      isUserLoggedIn : false,
      user : req.user
    };

    if(req.isAuthenticated()) {
      data.isUserLoggedIn = true;
    }

    return res
      .status(200)
      .json(data);
  })

  return router;
};
