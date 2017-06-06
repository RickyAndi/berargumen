const mongoose = require('../../mongoose');
const dbName = require('../../../config.json').testDbName;
const { expect } = require('chai');
const { async, await } = require('asyncawait');
const { boardService, userService, upvoteService } = require('../../services');
const { userData, boardData, usersData } = require('../data');

describe('upvoteService', () => {
  let connection, boardId, userId, userIds, upvoteId;

  before(async(() => {
    connection = mongoose.connect('mongodb://localhost/' + dbName);
    
    const user = await(userService.create(userData));
    const board = await(boardService.create(Object.assign(boardData, { creator : user._id })));

    const savedUsers = await(Promise.all([
      userService.create(usersData[0]),
      userService.create(usersData[1]),
      userService.create(usersData[2])
    ]));

    userIds = savedUsers.map(user => user._id);
    boardId = board._id;
    userId = user._id;
  }));

  after((done) => {
    connection.connection.db.dropDatabase()
      .then(() => {
        mongoose.connection.close(() => {
          done();
        });
      });
  });

  describe('create()', () => {
    it('test 1 : can create upvote', async(() => {
      const upvote = await(upvoteService.create(boardId));
      
      upvoteId = upvote._id;

      expect(upvote.board).to.equal(boardId);
    }));
  });

   describe('addUpvote()', () => {
    it('test 1 : can add user to upvote list', async(() => {
      await(upvoteService.addUpvote(boardId, userIds[0]));
      await(upvoteService.addUpvote(boardId, userIds[1]));
      await(upvoteService.addUpvote(boardId, userIds[2]));

      const upvote = await(upvoteService.findById({
        id : upvoteId,
        select : null
      }));
      
      expect(upvote.users.length).to.equal(userIds.length);
    }));
  });

  describe('removeUpvote()', () => {
    it('test 1 : can remove user from upvote list', async(() => {
      await(upvoteService.removeUpvote(boardId, userIds[0]));
      
      const upvote = await(upvoteService.findById({
        id : upvoteId,
        select : null
      }));
      
      const userIdIndexZero = upvote.users.find(userId => userId === userIds[0]);

      expect(upvote.users.length).to.equal((userIds.length - 1));
      expect(userIdIndexZero).to.not.exist;
    }));
  });
});
