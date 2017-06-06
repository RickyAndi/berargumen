const upvoteService = require('./upvote');
const downvoteService = require('./downvote');
const cardService = require('./card');
const bookmarkService = require('./bookmarks');
const boardArguersService = require('./board-arguers');
const boardService = require('./board');
const arguerRequestsService = require('./arguer-requests');
const userService = require('./user');

module.exports = {
  upvoteService,
  downvoteService,
  cardService,
  bookmarkService,
  boardArguersService,
  boardService,
  arguerRequestsService,
  userService
}