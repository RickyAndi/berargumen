const express = require('express')
const router = express.Router()
const MobileDetect = require('mobile-detect');

module.exports = sockets => {
  router.get('/', (req, res) => {
    return res.render('index.ejs', {
      developmentMode: process.env.NODE_ENV === 'development' ? true : false
    });
  });

  return router;
}
