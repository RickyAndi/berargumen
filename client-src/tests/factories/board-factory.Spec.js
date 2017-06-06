const expect = require('chai').expect;
const boardFactory = require('../../factories/board-factory');

const Board = require('./../../models/board');
const User = require('./../../models/user');

describe('Board Factory', function() {
  let boardInstance, boardData;

  before(function() {
    boardData = {
      _id : 'abcdefghijklmn',
      title : 'aku adalah anak gembala',
      description : 'lorem ipsum dolor',
      creator : {
        displayName : 'Budiman',
        profilePicUrl : 'http://google.com',
      },
      countOfReason : 10,
      countOfObjection : 20,
      countOfRebuttal : 25,
      arguers :  [
        {
          displayName : 'Budiman',
          profilePicUrl : 'http://google.com',
        },
        {
          displayName : 'Ilham Mansiz',
          profilePicUrl : 'http://duckduckgo.com',
        },
      ],
      tags : ['aku', 'adalah', 'anak'],
      countOfdownvote : 100,
      countOfupvote : 20,
      isCurrentUserUpvoted : false,
      isCurrentUserDownvoted : false,
      isBelongToCurrentUser : false,
      published : true
    };

    boardInstance = boardFactory.create(boardData);
  })

  it('can create instance of board with data provided', function() {
    expect(boardInstance).to.be.an.instanceof(Board);
    expect(boardInstance.getUser()).to.be.an.instanceof(User);
  })

  it('board instance get right id', function() {
    expect(boardInstance.getId()).to.equal(boardData._id);
  })

  it('board instance get right title', function() {
    expect(boardInstance.getTitle()).to.equal(boardData.title);
  })
  
  it('board instance get right description', function() {
    expect(boardInstance.getDescription()).to.equal(boardData.description);
  })

  it('board instance get right user', function() {
    expect(boardInstance.getUserName()).to.equal(boardData.creator.displayName);
    expect(boardInstance.getUserProfilePictureUrl()).to.equal(boardData.creator.profilePicUrl);
  })
  
  describe('board factory can set arguers', function() {
    it('board instance get right number of arguers', function() {
      expect(boardInstance.getCountOfArguers()).to.equal(boardData.arguers.length);
    })

    it('board instance get right data of arguers', function() {
      
      const arguers = boardInstance.getArguers();
      console.log(arguers)
      expect(arguers[0].getName()).to.equal(boardData.arguers[0].displayName);
      expect(arguers[0].getProfilePictureUrl()).to.equal(boardData.arguers[0].profilePicUrl);
      
      expect(arguers[1].getName()).to.equal(boardData.arguers[1].displayName);
      expect(arguers[1].getProfilePictureUrl()).to.equal(boardData.arguers[1].profilePicUrl);
      
    })
  })
  
  it('board instance get right count of reason', function(){
    expect(boardInstance.getCountOfReason()).to.equal(boardData.countOfReason);
  })

  it('board instance get right count of objection', function(){
    expect(boardInstance.getCountOfObjection()).to.equal(boardData.countOfObjection);
  })

  it('board instance get right count of rebuttal', function(){
    expect(boardInstance.getCountOfRebuttal()).to.equal(boardData.countOfRebuttal);
  })

  it('board instance get right tag', function() {
    expect(boardInstance.getTags()).to.equal(boardData.tags);
  })

  it('board instance get rigth count of upvote', function() {
    expect(boardInstance.getUpvote()).to.equal(boardData.upvote);
  })

  it('board instance get right count of downvote', function() {
    expect(boardInstance.getDownvote()).to.equal(boardData.downvote);
  })

  it('board instance get right value of isCurrentUserUpvoted', function() {
    expect(boardInstance.currentUserUpvoted()).to.equal(boardData.isCurrentUserUpvoted);  
  })

  it('board instance get right value of isCurrentUserDownvoted', function() {
    expect(boardInstance.currentUserDownvoted()).to.equal(boardData.isCurrentUserDownvoted);  
  })

  it('board instance get right value of published', function() {
    expect(boardInstance.published()).to.equal(boardData.published);
  })

  it('board instance get right value of isBelongToCurrentUser', function() {
    expect(boardInstance.belongsToCurrentUser()).to.equal(boardData.isBelongToCurrentUser);
  })
})