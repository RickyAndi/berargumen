const express = require('express')
const router = express.Router()

const pageDataRoute = require('./api/page-data');
const boardRoute = require('./api/board');

module.exports = sockets => {
  router.use('/page-data', pageDataRoute());
  router.use('/board', boardRoute());

  return router;
}