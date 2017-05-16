const mongoose = require('../../mongoose');
const Board = require('../../models/board');
const User = require('../../models/user');
const Card = require('../../models/card');
const cardTypeEnum = require('../../enums/card-type');
const { expect } = require('chai');
const { async, await } = require('asyncawait');

describe('board model', () => {
  let connection;

  before((done) => {
    connection = mongoose.connect('mongodb://localhost/berargumen-test', done);
  });

  after((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });

  describe('can make new board', () => {
    let boardData, userData;

    before(() => {
      boardData = {
        title : 'test board',
        description : 'lorem ipsum dolor sit amet',
        tags : ["lorem", "ipsum", "dolor"],
        topic : 'create new board',
        published : false
      };

      userData = {
        name : 'test user'
      }
    });

    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('test 1 : can make new Board and its related collection can be populated', async(() => {
      const userToBeCreated = new User({
        name : 'test user'
      });
      const newUser = await(userToBeCreated.save());
      
      const boardToBeCreated = new Board(
        Object.assign(boardData, { 
          creatorId : mongoose.Types.ObjectId(newUser._id)
        })
      );
      
      const newBoard = await(boardToBeCreated.save());
      const boardToBeTested = await(Board.findOne({ _id : newBoard._id }).populate('creator'));
      
      expect(boardToBeTested.title).to.equal(boardData.title);
      expect(boardToBeTested.description).to.equal(boardData.description);
      //expect(boardToBeTested.tags).to.eql(boardData.tags);
      expect(boardToBeTested.topic).to.equal(boardData.topic);
      expect(boardToBeTested.published).to.equal(boardData.published);
      expect(boardToBeTested.creator[0].name).to.equal(userData.name);
    }));
  });
  describe('board can retrieve its related cards', () => {
    let cardsData, userData, boardData, boardIdToBeTested;

    before(async(() => {
      
      cardsData = [
        {
          title : 'lorem ipsum',
          content : 'lorem ipsum',
          type : cardTypeEnum['REASON'],
          top : '100px',
          left : '100px',
        },
        {
          title : 'lorem ipsum',
          content : 'lorem ipsum',
          type : cardTypeEnum['OBJECTION'],
          top : '100px',
          left : '100px',
        },
        {
          title : 'lorem ipsum',
          content : 'lorem ipsum',
          type : cardTypeEnum['REBUTTAL'],
          top : '100px',
          left : '100px',
        },
        {
          title : 'lorem ipsum',
          content : 'lorem ipsum',
          type : cardTypeEnum['CO-REASON'],
          top : '100px',
          left : '100px',
        }
      ];

      boardData = {
        title : 'test board',
        description : 'lorem ipsum dolor sit amet',
        tags : ["lorem", "ipsum", "dolor"],
        topic : 'create new board',
        published : false
      };

      userData = {
        name : 'test user'
      }

      const user = new User(userData)
      const newUser = await(user.save());

      const board = new Board(Object.assign(boardData, { creatorId : mongoose.Types.ObjectId(newUser._id) }));
      const newBoard = await(board.save());

      boardIdToBeTested = newBoard._id;

      const cardSavePromises = cardsData.map(cardData => {
        const card = new Card(Object.assign(cardData, {
          boardId : mongoose.Types.ObjectId(newBoard._id),
          creatorId : mongoose.Types.ObjectId(newUser._id)
        }))
        return card.save();
      });

      await(Promise.all(cardSavePromises));
    }));

    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('can retrieve its count of related cards based on type', async(() => {
      const board = await(Board.findOne({ _id : boardIdToBeTested}).populate('cards'));

      expect(board.countOfReason).to.equal(cardsData.filter(card => card.type == 'reason' || card.type == 'co-reason').length);
      expect(board.countOfObjection).to.equal(cardsData.filter(card => card.type == 'objection').length);
      expect(board.countOfRebuttal).to.equal(cardsData.filter(card => card.type == 'rebuttal').length);
    }));
  });
});
