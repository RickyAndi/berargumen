const mongoose = require('../../mongoose');
const Board = require('../../models/board');
const User = require('../../models/user');
const Card = require('../../models/card');
const cardTypeEnum = require('../../enums/card-type');
const { expect } = require('chai');
const { async, await } = require('asyncawait');

describe('User model', () => {
  let connection;

  before((done) => {
    connection = mongoose.connect('mongodb://localhost/berargumen-test', done);
  });

  after((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });

  describe('can create new user', () => {
    let userData;

    before(() => {
      userData = {
        facebookId : 'abcdefghik',
        name : 'test user',
        profilePicUrl : 'http://google.com',
        gender : 'male',
        email : 'test@test.com'
      };
    });

    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('test 1 : creating new user, and its data must be right data previously provided', async(() => {
      const user = new User(userData);
      const newUser = await(user.save());
      expect(newUser.name).to.equal(userData.name);
      expect(newUser.facebookId).to.equal(userData.facebookId);
      expect(newUser.profilePicUrl).to.equal(userData.profilePicUrl);
      expect(newUser.gender).to.equal(userData.gender);
      expect(newUser.email).to.equal(userData.email);
    }));
  });

  describe('can retrieve cards created', () => {
    describe('can get cards created', () => {
      let cardsData, userData;

      before(() => {
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

        userData = {
          facebookId : 'abcdefghik',
          name : 'test user',
          profilePicUrl : 'http://google.com',
          gender : 'male',
          email : 'test@test.com'
        };
      });

      after((done) => {
        connection.connection.db.dropDatabase()
          .then(() => {
            done();
          });
      });

      it('test 1 : create new user and create some cards for that user, these cards can be retrieved and counted', async(() => {
        const user = new User(userData);
        const newUser = await(user.save());
        const cardsSavePromises = cardsData.map(cardData => {
          const card = new Card(Object.assign(cardData, { creatorId : mongoose.Types.ObjectId(newUser._id) }));
          return card.save();
        });
        await(Promise.all(cardsSavePromises));

        const userToBeTested = await(User.findOne({ _id : newUser._id }).populate('cards'));

        const expectedNumberOfCards = cardsData.length;

        expect(userToBeTested.numberOfCards).to.equal(expectedNumberOfCards);
      }));
    });
  });

  describe('can retrive boards created', () => {
    let boardsData, userData;

    before(() => {
      boardsData = [
        {
          title : 'test board',
          description : 'lorem ipsum dolor sit amet',
          tags : ["lorem", "ipsum", "dolor"],
          topic : 'create new board',
          published : false
        },
        {
          title : 'test board',
          description : 'lorem ipsum dolor sit amet',
          tags : ["lorem", "ipsum", "dolor"],
          topic : 'create new board',
          published : false
        },
        {
          title : 'test board',
          description : 'lorem ipsum dolor sit amet',
          tags : ["lorem", "ipsum", "dolor"],
          topic : 'create new board',
          published : false
        }
      ];

      userData = {
        facebookId : 'abcdefghik',
        name : 'test user',
        profilePicUrl : 'http://google.com',
        gender : 'male',
        email : 'test@test.com'
      };
    });

    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('test 1 : create user and create some boards, the count of boards can be counted', async(() => {
      const user = new User(userData);
      const newUser = await(user.save());
      const boardsSavePromises = boardsData.map(boardData => {
        const board = new Board(Object.assign(boardData, { creatorId : mongoose.Types.ObjectId(newUser._id) }));
        return board.save();
      });
      await(Promise.all(boardsSavePromises));

      const userToBeTested = await(User.findOne({ _id : newUser._id }).populate('boards'));

      const expectedNumberOfBoards = boardsData.length;

      expect(userToBeTested.numberOfBoards).to.equal(expectedNumberOfBoards);
    }));
  });
});
