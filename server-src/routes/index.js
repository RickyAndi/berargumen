const express = require('express')
const router = express.Router()
const MobileDetect = require('mobile-detect');

module.exports = sockets => {
  router.get('/', (req, res) => {
    if(process.env.NODE_ENV === 'development') {
      return res.render('index-development.ejs');
    }
    //res.render('index-mobile.ejs');   
    // const md = new MobileDetect(req.headers['user-agent']);

    // if(md.mobile()) {
    //  res.render('index-mobile.ejs'); 
    // }
    
    return res.render('index.ejs');
  })

  return router;
}