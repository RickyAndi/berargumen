const mongoose = require('../../mongoose');
const dbName = require('../../../config.json').testDbName;
const { expect } = require('chai');
const { async, await } = require('asyncawait');
const { boardService, userService, upvoteService, downvoteService } = require('../../services');
const slugify = require('slugify');
const requireModels  = require('../../models/require-models');
const { userData, boardData, usersData } = require('../data');

describe('boardService', () => {
  let connection;

  before((done) => {
    connection = mongoose.connect('mongodb://localhost/' + dbName, done);
    requireModels();
  });

  after((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });

  describe('create(), can create new board', () => {
    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('test 1 : can create new board with right data', async(() => {
      const user = await(userService.create(userData));
      const boardDataWithUserId = Object.assign(boardData, { creator : user._id, slug : slugify(boardData.title) });
      const newBoard = await(boardService.create(boardDataWithUserId));

      expect(newBoard.title).to.equal(boardDataWithUserId.title);
      expect(newBoard.creator).to.equal(user._id);
      expect(newBoard.slug).to.equal(boardDataWithUserId.slug);
      expect(newBoard.published).to.equal(boardDataWithUserId.published);
    }));
  });

  describe('publish(), can change published field to true', () => {
    let boardIdToBeChanged, userId;
    
    before(async(() => {
      const user = await(userService.create(userData));
      const board = await(boardService.create(Object.assign(boardData, { creator : user._id })));
      boardIdToBeChanged = board._id;
      userId = user._id;
    }));

    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('test 1 : can change board published to true', async(() => {
      const board = await(boardService.findById({
        boardId : boardIdToBeChanged,
        select : null
      }));
      expect(board.published).to.not.be.true;

      await(boardService.publish({
        boardId : boardIdToBeChanged,
        userId : userId
      }));

      const changedBoard = await(boardService.findById({
        boardId : boardIdToBeChanged,
        select : null
      }));
      expect(changedBoard.published).to.be.true;
    }));
  });

  describe('unpublish(), can change published field to false', () => {
    let boardIdToBeChanged, userId;
    
    before(async(() => {
      const user = await(userService.create(userData));
      const board = await(boardService.create(Object.assign(boardData, { creator : user._id, published : true })));
      boardIdToBeChanged = board._id;
      userId = user._id;
    }));

    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('test 1 : can change board published to false', async(() => {
      const board = await(boardService.findById({
        boardId : boardIdToBeChanged,
        select : null
      }));
      expect(board.published).to.be.true;

      await(boardService.unpublish({
        boardId : boardIdToBeChanged,
        userId : userId
      }));

      const changedBoard = await(boardService.findById({
        boardId : boardIdToBeChanged,
        select : null
      }));
      expect(changedBoard.published).to.not.be.true;
    }));
  });

  describe('paginate()', () => {
    describe('can paginate board', () => {

    });

    describe('can modify pagination docs, add with "isBelongToCurrentUser", "isCurrentUserUpvoted", "isCurrentUserDownvoted" the value depend on id of current user', () => {
      let userIds, fakeCurrentUserId;

      before(async(() => {
        const user = await(userService.create(userData));
        fakeCurrentUserId = user._id.toString();
        
        const board = await(boardService.create(Object.assign(boardData, { creator : user._id })));
        await(upvoteService.create(board._id));
        await(downvoteService.create(board._id));

        const savedUsers = await(Promise.all([
          userService.create(usersData[0]),
          userService.create(usersData[1]),
          userService.create(usersData[2])
        ]));
        
        userIds = savedUsers.map(user => user._id.toString());

        // userIds[0] -> upvote
        await(upvoteService.addUpvote(board._id, userIds[0]));

        // userIds[1], userIds[2] -> downvote
        await(downvoteService.addDownvote(board._id, userIds[1]));
        await(downvoteService.addDownvote(board._id, userIds[2]));
      }));

      after((done) => {
        connection.connection.db.dropDatabase()
          .then(() => {
            done();
          });
      });

      it('test 1 : current user is creator of board', async(() => {
        const options = {
          query : {},
          populate : 'cards creator arguerRequests rejectedArguerRequests arguers upvotes downvotes',
          sort : {
            updated : -1
          },
          page : 1
        };
        
        const paginationData = await(boardService.paginate(options, fakeCurrentUserId));
        expect(paginationData.docs[0].isBelongToCurrentUser).to.be.true;
        expect(paginationData.docs[0].isCurrentUserUpvoted).to.not.be.true;
        expect(paginationData.docs[0].isCurrentUserDownvoted).to.not.be.true;
      }));

      it('test 2 : current user upvoted board', async(() => {
        const options = {
          query : {},
          populate : 'cards creator arguerRequests rejectedArguerRequests arguers upvotes downvotes',
          sort : {
            updated : -1
          },
          page : 1
        };
        
        const paginationData = await(boardService.paginate(options, userIds[0]));
        expect(paginationData.docs[0].isBelongToCurrentUser).to.not.be.true;
        expect(paginationData.docs[0].isCurrentUserUpvoted).to.be.true;
        expect(paginationData.docs[0].isCurrentUserDownvoted).to.not.be.true;
      }));

      it('test 3 : current user downvoted board', async(() => {
        const options = {
          query : {},
          populate : 'cards creator arguerRequests rejectedArguerRequests arguers upvotes downvotes',
          sort : {
            updated : -1
          },
          page : 1
        };
        
        const paginationData = await(boardService.paginate(options, userIds[1]));
        expect(paginationData.docs[0].isBelongToCurrentUser).to.not.be.true;
        expect(paginationData.docs[0].isCurrentUserUpvoted).to.not.be.true;
        expect(paginationData.docs[0].isCurrentUserDownvoted).to.be.true;
      }));

      it('test 4 : current userId is null, which mean current user not logged in', async(() => {
        const options = {
          query : {},
          populate : 'cards creator arguerRequests rejectedArguerRequests arguers upvotes downvotes',
          sort : {
            updated : -1
          },
          page : 1
        };
        
        const paginationData = await(boardService.paginate(options));
        expect(paginationData.docs[0].isBelongToCurrentUser).to.not.be.true;
        expect(paginationData.docs[0].isCurrentUserUpvoted).to.not.be.true;
        expect(paginationData.docs[0].isCurrentUserDownvoted).to.not.be.true;
      }));
    });
  });

  describe('addArguers', () => {
    describe('can add arguers which is user id', () => {
      let boardIdToBeAddedWithArguer, userIdToBeAdded;

      before(async(() => {
        const newUser = await(userService.create(userData));
        userIdToBeAdded = newUser._id;

        const creator = await(userService.create(userData));
        const newBoard = await(boardService.create(Object.assign(boardData, { creator : creator._id })));
        boardIdToBeAddedWithArguer = newBoard._id;
      }));

      after((done) => {
        connection.connection.db.dropDatabase()
          .then(() => {
            done();
          });
      });

      it('test 1', async(() => {
        await(boardService.addArguer(boardIdToBeAddedWithArguer, userIdToBeAdded));
        const boardToBeTested = await(boardService.findById({
          boardId : boardIdToBeAddedWithArguer,
          select : null
        }));
        const isUserIdToBeAddedExist = boardToBeTested.arguers.some(userId => userId.toString() === userIdToBeAdded.toString());
        expect(isUserIdToBeAddedExist).to.be.true;
      }));
    });
  });

  describe('delete()', () => {
    describe('can change board delete field to true', () => {
      let boardIdToBeDeleted;

      before(async(() => {
        const newBoard = await(boardService.create(boardData));
        boardIdToBeDeleted = newBoard._id.toString();
      }));

      after((done) => {
        connection.connection.db.dropDatabase()
          .then(() => {
            done();
          });
      });

      it('test 1', async(() => {
        const boardBeforeDeleted = await(boardService.findById({ boardId : boardIdToBeDeleted, select : null }));
        expect(boardBeforeDeleted.deleted).to.not.be.true;

        await(boardService.delete(boardIdToBeDeleted));

        const boardAfterDeleted = await(boardService.findById({ boardId : boardIdToBeDeleted, select : null }));
        expect(boardAfterDeleted.deleted).to.be.true;
      }));
    });
  });
});