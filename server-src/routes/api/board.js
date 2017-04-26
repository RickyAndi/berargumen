const express = require('express');
const router = express.Router();
const boardsData = require('./boardData');

module.exports = sockets => {
  router.get('/featured', (req, res) => {
    return res
      .status(200)
      .json({
        docs : boardsData,
        pages : 4
      });
  });

  router.get('/new', (req, res) => {
    return res
      .status(200)
      .json({
        docs : boardsData,
        pages : 7
      });
  });

  router.get('/my', (req, res) => {
    return res
      .status(200)
      .json({
        docs : boardsData,
        pages : 3
      });
  });

  router.get('/bookmarked', (req, res) => {
    return res
      .status(200)
      .json({
        docs : boardsData,
        pages : 7
      });
  });

  router.get('/collaborated', (req, res) => {
    return res
      .status(200)
      .json({
        docs : boardsData,
        pages : 6
      });
  });

  router.get('/all', (req, res) => {
    return res
      .status(200)
      .json({
        docs : boardsData,
        pages : 10
      });
  });

  return router;
};
