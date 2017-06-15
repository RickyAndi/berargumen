const express = require('express')
const router = express.Router()
const MobileDetect = require('mobile-detect');
const boardService = require('../services/board');
const { async, await } = require('asyncawait');

module.exports = sockets => {
  router.get('/:slug', async((req, res) => {
    const slug = req.params.slug;
    const board = await(boardService.findBySlug(slug, 'creator'));
    
    return res.render('board-desktop.ejs', {
      boardId: board._id,
      boardTitle: board.title,
      creatorName: board.creator.displayName,
      boardDescription: board.description
    });
  }));

  router.get('/', (req, res) => {
    const md = new MobileDetect(req.headers['user-agent']);

    if(md.mobile()) {
      res.render('board-mobile.ejs'); 
    }
    
    res.render('board-desktop.ejs');
  })
  
  return router;
}