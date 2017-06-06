const express = require('express');
const router = express.Router();

module.exports = sockets => {
  router.get('/index', (req, res, next) => {
    const data = {
      isUserLoggedIn : false,
      currentUserProfilePicUrl : null,
      currentUserName : null
    };
    
    if(req.isAuthenticated()) {
      data.isUserLoggedIn = true;
      data.currentUserProfilePicUrl = req.user.profilePicUrl;
      data.currentUserName = req.user.displayName;
    }

    return res
      .status(200)
      .json(data);
  })

  return router;
};
