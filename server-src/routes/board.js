const express = require('express')
const router = express.Router()
const MobileDetect = require('mobile-detect');

module.exports = sockets => {
  router.get('/:boardId', (req, res) => {
    res.render('board-desktop.ejs');
  });

  router.get('/', (req, res) => {
    const md = new MobileDetect(req.headers['user-agent']);

    if(md.mobile()) {
      res.render('board-mobile.ejs'); 
    }
    
    res.render('board-desktop.ejs');
  })
  
  return router;
}