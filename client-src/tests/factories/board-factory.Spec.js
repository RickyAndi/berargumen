const expect = require('chai').expect;
const boardFactory = require('../../factories/board-factory');

const Board = require('./../../models/board');
const User = require('./../../models/user');

describe('Board Factory', function() {
  let boardInstance, boardData;

  before(function() {
    boardData = {
      id : 'abcdefghijklmn',
      title : 'aku adalah anak gembala',
      description : 'lorem ipsum dolor',
      user : {
        name : 'Budiman',
        profilePictureUrl : 'http://google.com',
        getName : function() {
          return this.name;
        },
        getProfilePictureUrl : function() {
          return this.profilePictureUrl;
        }
      },
      countOfReason : 10,
      countOfObjection : 20,
      countOfRebuttal : 25,
      collaborators :  [
        {
          name : 'Budiman',
          profilePictureUrl : 'http://google.com',
          getName : function() {
            return this.name;
          },
          getProfilePictureUrl : function() {
            return this.profilePictureUrl;
          }   
        },
        {
          name : 'Ilham Mansiz',
          profilePictureUrl : 'http://duckduckgo.com',
          getName : function() {
            return this.name;
          },
          getProfilePictureUrl : function() {
            return this.profilePictureUrl;
          }
        },
      ],
      tags : ['aku', 'adalah', 'anak'],
      topic : 'Universe',
      downvote : 100,
      upvote : 20,
      isCurrentUserUpvoted : false,
      isCurrentUserDownvoted : false,
      isBelongToCurrentUser : false,
      isPublished : true
    };

    boardInstance = boardFactory.create(boardData);
  })

  it('can create instance of board with data provided', function() {
    expect(boardInstance).to.be.an.instanceof(Board);
    expect(boardInstance.getUser()).to.be.an.instanceof(User);
  })

  it('board instance get right id', function() {
    expect(boardInstance.getId()).to.equal(boardData.id);
  })

  it('board instance get right title', function() {
    expect(boardInstance.getTitle()).to.equal(boardData.title);
  })
  
  it('board instance get right description', function() {
    expect(boardInstance.getDescription()).to.equal(boardData.description);
  })

  it('board instance get right user', function() {
    expect(boardInstance.getUserName()).to.equal(boardData.user.name);
    expect(boardInstance.getUserProfilePictureUrl()).to.equal(boardData.user.profilePictureUrl);
  })
  
  describe('board factory can set collaboratos', function() {
    it('board instance get right number of collaborators', function() {
      expect(boardInstance.getCountOfCollaborators()).to.equal(boardData.collaborators.length);
    })

    it('board instance get right data of users', function() {
      
      const collaborators = boardInstance.getCollaborators();
      
      expect(collaborators[0].getName()).to.equal(boardData.collaborators[0].getName());
      expect(collaborators[0].getProfilePictureUrl()).to.equal(boardData.collaborators[0].getProfilePictureUrl());
      
      expect(collaborators[1].getName()).to.equal(boardData.collaborators[1].getName());
      expect(collaborators[1].getProfilePictureUrl()).to.equal(boardData.collaborators[1].getProfilePictureUrl());
      
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

  it('board instance get right topic', function() {
    expect(boardInstance.getTopic()).to.equal(boardData.topic);
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

  it('board instance get right value of isPublished', function() {
    expect(boardInstance.published()).to.equal(boardData.isPublished);
  })

  it('board instance get right value of isBelongToCurrentUser', function() {
    expect(boardInstance.belongsToCurrentUser()).to.equal(boardData.isBelongToCurrentUser);
  })
})