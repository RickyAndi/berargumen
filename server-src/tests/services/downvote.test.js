const mongoose = require('../../mongoose');
const dbName = require('../../../config.json').testDbName;
const { expect } = require('chai');
const { async, await } = require('asyncawait');
const { boardService, userService, downvoteService } = require('../../services');
const { userData, boardData, usersData } = require('../data');

describe('downvoteService', () => {
  let connection, boardId, userId, userIds, downvoteId;

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
    it('test 1 : can create downvote', async(() => {
      const downvote = await(downvoteService.create(boardId));
      
      downvoteId = downvote._id;

      expect(downvote.board).to.equal(boardId);
    }));
  });

   describe('addDownvote()', () => {
    it('test 1 : can add user to downvote list', async(() => {
      await(downvoteService.addDownvote(boardId, userIds[0]));
      await(downvoteService.addDownvote(boardId, userIds[1]));
      await(downvoteService.addDownvote(boardId, userIds[2]));

      const downvote = await(downvoteService.findById({
        id : downvoteId,
        select : null
      }));
      
      expect(downvote.users.length).to.equal(userIds.length);
    }));
  });

  describe('removeDownvote()', () => {
    it('test 1 : can remove user from downvote list', async(() => {
      await(downvoteService.removeDownvote(boardId, userIds[0]));
      
      const downvote = await(downvoteService.findById({
        id : downvoteId,
        select : null
      }));
      
      const userIdIndexZero = downvote.users.find(userId => userId === userIds[0]);

      expect(downvote.users.length).to.equal((userIds.length - 1));
      expect(userIdIndexZero).to.not.exist;
    }));
  });
});
