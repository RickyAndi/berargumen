const express = require('express');
const router = express.Router();
const boardsData = require('./boardData');
const Board = require('../../models/board');
const { async, await } = require('asyncawait');

module.exports = sockets => {
  router.get('/featured', async((req, res) => {
    const page = req.query.page;
    const data = await(Board.paginate({}, { 
      page : page,
      populate : 'cards creator arguerRequests rejectedArguerRequests arguers'
    }));
    
    return res
      .status(200)
      .json(data);
  }));

  router.get('/new', async((req, res) => {
    const page = req.query.page;
    const data = await(Board.paginate({}, { 
      page : page,
      populate : 'cards creator arguerRequests rejectedArguerRequests arguers'
    }));
    
    return res
      .status(200)
      .json(data);
  }));

  router.get('/my', async((req, res) => {
    const page = req.query.page;
    const data = await(Board.paginate({}, { 
      page : page,
      populate : 'cards creator arguerRequests rejectedArguerRequests arguers'
    }));
    
    return res
      .status(200)
      .json(data);
  }));

  router.get('/bookmarked', async((req, res) => {
    const page = req.query.page;
    const data = await(Board.paginate({}, { 
      page : page,
      populate : 'cards creator arguerRequests rejectedArguerRequests arguers'
    }));
    
    return res
      .status(200)
      .json(data);
  }));

  router.get('/collaborated', async((req, res) => {
    const page = req.query.page;
    const data = await(Board.paginate({}, { 
      page : page,
      populate : 'cards creator arguerRequests rejectedArguerRequests arguers'
    }));
    
    return res
      .status(200)
      .json(data);
  }));

  router.get('/all', async((req, res) => {
    const page = req.query.page;
    const data = await(Board.paginate({}, { 
      page : page,
      populate : 'cards creator arguerRequests rejectedArguerRequests arguers'
    }));
    
    return res
      .status(200)
      .json(data);
  }));

  return router;
};
