const express = require('express')
const router = express.Router()
const MobileDetect = require('mobile-detect');

module.exports = sockets => {
  router.get('/', (req, res) => {
    //res.render('index-mobile.ejs');   
    // const md = new MobileDetect(req.headers['user-agent']);

    // if(md.mobile()) {
    //  res.render('index-mobile.ejs'); 
    // }
    
    res.render('index.ejs');
  })

  return router;
}