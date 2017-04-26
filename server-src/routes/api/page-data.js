const express = require('express');
const router = express.Router();

module.exports = sockets => {
  router.get('/index', (req, res, next) => {
    const data = {
      isUserLoggedIn : true
    };

    if(req.user) {
      data.isUserLoggedIn = true;
    }

    return res
      .status(200)
      .json(data);
  })

  return router;
};
