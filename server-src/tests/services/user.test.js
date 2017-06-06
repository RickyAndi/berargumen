const mongoose = require('../../mongoose');
const dbName = require('../../../config.json').testDbName;
const { expect } = require('chai');
const { async, await } = require('asyncawait');
const { userService, boardService } = require('../../services');
const { userData, boardData, usersData } = require('../data');

describe('userService', () => {
  let connection;

  before((done) => {
    connection = mongoose.connect('mongodb://localhost/' + dbName, done);
  });

  after((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });

  describe('create(), can create new user', () => {
    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('test 1 : can create new user and get same data as provided', async(() => {
      const newUser = await(userService.create(userData));
      expect(newUser.email).to.equal(userData.email);
      expect(newUser.displayName).to.equal(userData.displayName);
      expect(newUser.profilePicUrl).to.equal(userData.profilePicUrl);
    }));
  });

  describe('findOne(), can find one user based on query and select field', () => {
    before(async(() => {
      await(userService.create(userData));
    }));

    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    describe('can find one user based on query', () => {
      it('test 1 : can find one user', async(() => {
        const user = await(userService.findOne({
          query : {
            email : userData.email
          },
          select : null
        }));
        expect(user.email).to.equal(userData.email);
        expect(user.displayName).to.equal(userData.displayName);
        expect(user.profilePicUrl).to.equal(userData.profilePicUrl);
      }));
    });

    describe('can select field', () => {
      it('test 1 : can select only email', async(() => {
        const user = await(userService.findOne({
          query : {
            email : userData.email
          },
          select : 'email'
        }));
        expect(user.email).to.exist;
        expect(user.displayName).to.not.exist;
        expect(user.profilePicUrl).to.not.exist;
      }));
    });
  });

  describe('findOrCreateFacebook(), can create new user based on profile got from facebook login, if user not exist, if user exists just return it', () => {
    let profileDataFromFacebookA, profileDataFromFacebookB;

    before(async(() => {
      profileDataFromFacebookA = {
        id: '358873724508298',
        username: undefined,
        displayName: 'Budi Anduk',
        name: { 
          familyName: undefined,
          givenName: undefined,
          middleName: undefined 
        },
        gender: undefined,
        profileUrl: 'https://www.facebook.com/app_scoped_user_id/358873724508298/',
        emails: [ { value: 'budianduk@gmail.com' } ],
        photos: [ { value: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c3.0.50.50/p50x50/13087710_169708890091450_1689990532070165792_n.jpg?oh=7f8394931e3bab76842ca2bf3e2dc3ba&oe=59A3A7EE' } ],
        provider: 'facebook',
        _raw: '{"id":"358873724508298","name":"Ricky Andika","link":"https:\\/\\/www.facebook.com\\/app_scoped_user_id\\/358873724508298\\/","picture":{"data":{"is_silhouette":false,"url":"https:\\/\\/scontent.xx.fbcdn.net\\/v\\/t1.0-1\\/c3.0.50.50\\/p50x50\\/13087710_169708890091450_1689990532070165792_n.jpg?oh=7f8394931e3bab76842ca2bf3e2dc3ba&oe=59A3A7EE"}},"email":"ricky10andika\\u0040gmail.com"}',
        _json: { 
          id: '358873724508298',
          name: 'Budi Anduk',
          link: 'https://www.facebook.com/app_scoped_user_id/358873724508298/',
          picture: { data: [Object] },
          email: 'budianduk@gmail.com' 
        } 
      }

      profileDataFromFacebookB = {
        id: '358873724508298',
        username: undefined,
        displayName: 'Budi Jancok',
        name: { 
          familyName: undefined,
          givenName: undefined,
          middleName: undefined 
        },
        gender: undefined,
        profileUrl: 'https://www.facebook.com/app_scoped_user_id/358873724508298/',
        emails: [ { value: 'budijancok@gmail.com' } ],
        photos: [ { value: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c3.0.50.50/p50x50/13087710_169708890091450_1689990532070165792_n.jpg?oh=7f8394931e3bab76842ca2bf3e2dc3ba&oe=59A3A7EE' } ],
        provider: 'facebook',
        _raw: '{"id":"358873724508298","name":"Budi Jancok","link":"https:\\/\\/www.facebook.com\\/app_scoped_user_id\\/358873724508298\\/","picture":{"data":{"is_silhouette":false,"url":"https:\\/\\/scontent.xx.fbcdn.net\\/v\\/t1.0-1\\/c3.0.50.50\\/p50x50\\/13087710_169708890091450_1689990532070165792_n.jpg?oh=7f8394931e3bab76842ca2bf3e2dc3ba&oe=59A3A7EE"}},"email":"ricky10andika\\u0040gmail.com"}',
        _json: { 
          id: '358873724508298',
          name: 'Budi Jancok',
          link: 'https://www.facebook.com/app_scoped_user_id/358873724508298/',
          picture: { data: [Object] },
          email: 'budijancok@gmail.com' 
        }
      }

      // save
      await(userService.findOrCreateFacebook(profileDataFromFacebookA));
    }));

    after((done) => {
      connection.connection.db.dropDatabase()
        .then(() => {
          done();
        });
    });

    it('test 1 : if facebook user already exist in db, it will find and return it', async(() => {
      const user = await(userService.findOrCreateFacebook(profileDataFromFacebookA));
      expect(user.displayName).to.equal(profileDataFromFacebookA.displayName);
      expect(user.profilePicUrl).to.equal(profileDataFromFacebookA.photos[0].value);
      expect(user.email).to.equal(profileDataFromFacebookA.emails[0].value);
    }));

    it('test 2 : if facebook user doestnt exist in db, it will create it and return it', async(() => {
      const user = await(userService.findOrCreateFacebook(profileDataFromFacebookB));
      expect(user.displayName).to.equal(profileDataFromFacebookB.displayName);
      expect(user.profilePicUrl).to.equal(profileDataFromFacebookB.photos[0].value);
      expect(user.email).to.equal(profileDataFromFacebookB.emails[0].value);
    }));
  });

  describe('addBookmarkedBoard()', () => {
    describe('can add boardId', () => {
      let userIdToBeUsed, boardIdToBeAdded
      
      before(async(() => {
        const newUser = await(userService.create(userData));
        const newBoard = await(boardService.create(Object.assign(boardData, { creator : newUser._id })));
        userIdToBeUsed = newUser._id.toString();
        boardIdToBeAdded = newBoard._id.toString();
      }));

      after((done) => {
        connection.connection.db.dropDatabase()
          .then(() => {
            done();
          });
      });

      it('test 1', async(() => {
        await(userService.addBookmarkedBoard(userIdToBeUsed, boardIdToBeAdded));

        const userToBeTested = await(userService.findById(userIdToBeUsed));
        const isBoardIdExist = userToBeTested.bookmarkedBoards.some((boardId) => boardId.toString() === boardIdToBeAdded);
        expect(isBoardIdExist).to.be.true;
      }));
    });
  });

  describe('removeBookmarkedBoard()', () => {
    describe('can remove boardId', () => {
      let userIdToBeUsed, boardIdToBeRemoved
      
      before(async(() => {
        const newUser = await(userService.create(userData));
        const newBoard = await(boardService.create(Object.assign(boardData, { creator : newUser._id })));
        userIdToBeUsed = newUser._id.toString();
        boardIdToBeAdded = newBoard._id.toString();
        
        await(userService.addBookmarkedBoard(userIdToBeUsed, boardIdToBeAdded));
      }));

      after((done) => {
        connection.connection.db.dropDatabase()
          .then(() => {
            done();
          });
      });

      it('test 1', async(() => {
        const userToBeTestedBeforeRemoved = await(userService.findById({ 
          id : userIdToBeUsed, 
          select : null
        }));
        const isBoardIsExistBeforeRemoved = userToBeTestedBeforeRemoved.bookmarkedBoards.some((boardId) => boardId.toString() === boardIdToBeAdded);
        expect(isBoardIsExistBeforeRemoved).to.be.true;

        await(userService.removeBookmarkedBoard(userIdToBeUsed, boardIdToBeAdded));

        const userToBeTestedAfterRemoved = await(userService.findById({ 
          id : userIdToBeUsed, 
          select : null
        }));
        const isBoardIsExistAfterRemoved = userToBeTestedAfterRemoved.bookmarkedBoards.some((boardId) => boardId.toString() === boardIdToBeAdded);
        expect(isBoardIsExistAfterRemoved).to.not.be.true;
      }));
    });
  });
});