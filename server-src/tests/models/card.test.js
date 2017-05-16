const mongoose = require('../../mongoose');
const Board = require('../../models/board');
const User = require('../../models/user');
const Card = require('../../models/card');
const { expect } = require('chai');
const { async, await } = require('asyncawait');
const cardTypeEnum = require('../../enums/card-type');

describe('card model', () => {
  let connection;

  before((done) => {
    connection = mongoose.connect('mongodb://localhost/berargumen-test', done);
  });

  after((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });

  describe('can create new card', () => {
    let cardData, userData, boardData;

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
      };

      cardData = {
        title : 'lorem ipsum',
        content : 'lorem ipsum',
        type : cardTypeEnum['REASON'],
        top : '100px',
        left : '100px',
      };
    });

    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('test 1 : create new card and its related user and board, and all of these can be retireved', async(() => {
      const user = new User(userData);
      const newUser = await(user.save());

      const board = new Board(boardData);
      const newBoard = await(board.save());

      const card = new Card(Object.assign(cardData, { 
        creatorId : mongoose.Types.ObjectId(newUser._id), 
        boardId : mongoose.Types.ObjectId(newBoard._id) })
      );
      const newCard = await(card.save());

      const cardToBeTested = await(
        Card.findOne({ _id : newCard._id})
          .populate('board')
          .populate('creator')
      );

      expect(cardToBeTested.title).to.equal(cardData.title);
      expect(cardToBeTested.content).to.equal(cardData.content);
      expect(cardToBeTested.type).to.equal(cardData.type);
      expect(cardToBeTested.top).to.equal(cardData.top);
      expect(cardToBeTested.left).to.equal(cardData.left);

      expect(cardToBeTested.board[0].title).to.equal(boardData.title);
      expect(cardToBeTested.board[0].description).to.equal(boardData.description);
      //expect(cardToBeTested.board[0].tags).to.eql(boardData.tags);
      expect(cardToBeTested.board[0].topic).to.equal(boardData.topic);
      expect(cardToBeTested.board[0].published).to.equal(boardData.published);
      
      expect(cardToBeTested.creator[0].name).to.equal(userData.name);
    }));
  });

  describe('card can retrieve its related card', () => {
    let cardData, userData, boardData;

    before(() => {
      cardDataA = {
        title : 'lorem ipsum',
        content : 'lorem ipsum',
        type : cardTypeEnum['CONTENTION'],
        top : '100px',
        left : '100px',
      };

      cardDataB = {
        title : 'lorem ipsum',
        content : 'lorem ipsum',
        type : cardTypeEnum['REASON'],
        top : '100px',
        left : '100px',
      }
    });

    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('test 1 : create two card that related, and that related card can be retrieved', async(() => {
      const cardA = new Card(cardDataA);
      const newCardA = await(cardA.save());

      const cardB = new Card(Object.assign(cardDataB, { 
        related : {
          toId : mongoose.Types.ObjectId(newCardA._id),
          type : cardDataB.type
        }
      }));
      const newCardB = await(cardB.save());

      const cardToBeTested = await(
        Card.findOne({ _id : newCardB._id })
          .populate('relatedCard')
      );
      
      expect(cardToBeTested.relatedCard[0].title).to.equal(cardDataA.title);
    }));
  });
});
