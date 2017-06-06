const mongoose = require('../../mongoose');
const dbName = require('../../../config.json').testDbName;
const { expect } = require('chai');
const { async, await } = require('asyncawait');
const { arguerRequestsService, boardService, userService } = require('../../services');
const { boardData, userData } = require('../data');

describe('arguerRequestsService', () => {
  let connection;

  before((done) => {
    connection = mongoose.connect('mongodb://localhost/' + dbName, done);
  });

  after((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });

  describe('create()', () => {
    describe('can make new arguerRequests', () => {
      let  boardIdToBeUsed;

      before(async(() => {
        const newBoard = await(boardService.create(boardData));
        boardIdToBeUsed = newBoard._id;
      }));

      after((done) => {
        connection.connection.db.dropDatabase()
          .then(() => {
            done();
          });
      });

      it('test 1', async(() => {
        const newArguerRequest = await(arguerRequestsService.create(boardIdToBeUsed));
        expect(newArguerRequest.board).to.equal(boardIdToBeUsed);
      }));
    })
  });

  describe('addArguerRequest()', () => {
    describe('can add userId to users array in arguerRequest', () => {
      let boardIdToBeUsed, userIdToBeUsed, arguerRequestIdToBeUsed;

      before(async(() => {
        const newBoard = await(boardService.create(boardData));
        boardIdToBeUsed = newBoard._id;

        const newUser = await(userService.create(userData));
        userIdToBeUsed = newUser._id;

        const newArguerRequest = await(arguerRequestsService.create(boardIdToBeUsed));
        arguerRequestIdToBeUsed = newArguerRequest._id;
      }));

      after((done) => {
        connection.connection.db.dropDatabase()
          .then(() => {
            done();
          });
      });

      it('test 1', async(() => {
        const arguerRequestWithAddition = await(arguerRequestsService.addArguerRequest(boardIdToBeUsed, userIdToBeUsed));
        const arguerRequestToBeChecked = await(arguerRequestsService.findById(arguerRequestIdToBeUsed));
        const isUserIdExist = arguerRequestToBeChecked.users.some(userId => userId.toString() === userIdToBeUsed.toString());
        expect(isUserIdExist).to.be.true;
      }));
    });
  });
})