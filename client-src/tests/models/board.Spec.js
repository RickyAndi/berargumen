var expect = require('chai').expect;
var Board = require('./../../models/board');

describe('Board Model', function() {
  const fakeUser = {
    name : 'Budiman',
    profilePictureUrl : 'http://google.com',
    getName() {
      return this.name;
    },
    getProfilePictureUrl() {
      return this.profilePictureUrl;
    }
  }

  const fakeCollaborators = [
    {
      name : 'Budiman',
      profilePictureUrl : 'http://google.com',
      getName() {
        return this.name;
      },
      getProfilePictureUrl() {
        return this.profilePictureUrl;
      }   
    },
    {
      name : 'Ilham Mansiz',
      profilePictureUrl : 'http://duckduckgo.com',
      getName() {
        return this.name;
      },
      getProfilePictureUrl() {
        return this.profilePictureUrl;
      }
    }
  ];

  var boardData = {
    id : 'abcdefghijklmn',
    title : 'aku adalah anak gembala',
    description : 'lorem ipsum dolor',
    user : fakeUser,
    countOfReason : 10,
    countOfObjection : 20,
    countOfRebuttal : 25,
    collaborators : fakeCollaborators,
    tags : ['aku', 'adalah', 'anak'],
    topic : 'Universe',
    downvote : 100,
    upvote : 20,
    isCurrentUserUpvoted : false,
    isCurrentUserDownvoted : false
  }

  var boardInstanceA,boardInstanceB;

  before(function() {
    boardInstanceA = new Board();
    boardInstanceB = new Board();
  })

  it('can set id and get id', function() {
    boardInstanceA.setId(boardData.id);
    expect(boardInstanceA.getId()).to.equal(boardData.id)
  })

  it('can set title and get title', function() {
    boardInstanceA.setTitle(boardData.title)
    expect(boardInstanceA.getTitle()).to.equal(boardData.title)
  });

  it('can set description and get description', function() {
    boardInstanceA.setDescription(boardData.description)
    expect(boardInstanceA.getDescription()).to.equal(boardData.description)
  });

  it('can set user and get its user data', function() {
    boardInstanceA.setUser(boardData.user);
    expect(boardInstanceA.getUserName()).to.equal(boardData.user.getName());
    expect(boardInstanceA.getUserProfilePictureUrl()).to.equal(boardData.user.getProfilePictureUrl());
  });

  it('it get false if user is set', function() {
    expect(boardInstanceA.isUserNull()).to.not.be.true;
  })

  it('it get true if user is set', function() {
    expect(boardInstanceB.isUserNull()).to.be.true;
  })

  it('can set collaborators and get count', function() {
    boardInstanceA.setArguers(boardData.collaborators);
    expect(boardInstanceA.getCountOfArguers()).to.equal(boardData.collaborators.length);
  })

  it('can set count of reason and get it', function(){
    boardInstanceA.setCountOfReason(boardData.countOfReason);
    expect(boardInstanceA.getCountOfReason()).to.equal(boardData.countOfReason);
  })

  it('can set count of objection and get it', function(){
    boardInstanceA.setCountOfObjection(boardData.countOfObjection);
    expect(boardInstanceA.getCountOfObjection()).to.equal(boardData.countOfObjection);
  })

  it('can set count of rebuttal and get it', function(){
    boardInstanceA.setCountOfRebuttal(boardData.countOfRebuttal);
    expect(boardInstanceA.getCountOfRebuttal()).to.equal(boardData.countOfRebuttal);
  })

  it('can set tags and get tags', function() {
    var tags = ['bumi', 'bulat', 'mama'];
    boardInstanceA.setTags(boardData.tags);
    expect(boardInstanceA.getTags()).to.equal(boardData.tags);
  })
  
  describe('board upvoted state by current user', function() {
    it('if not set, will return false', function() {
      expect(boardInstanceA.currentUserUpvoted()).to.equal(false);
    })

    it('can set and retrieve it', function() {
      var isCurrentUserUpvoted = true;
      boardInstanceA.setIsCurrentUserUpvoted(isCurrentUserUpvoted);
    })
  })

  describe('board downvoted state by current user', function() {
    it('if not set, will return false', function() {
      expect(boardInstanceA.currentUserDownvoted()).to.equal(false);
    })

    it('can set and retrieve it', function() {
      var isCurrentUserDownvoted = true;
      boardInstanceA.setIsCurrentUserDownvoted(isCurrentUserDownvoted);
    })
  })

  describe('board belongs to current user', function() {
    it('if not set, will return false', function() {
      expect(boardInstanceA.belongsToCurrentUser()).to.equal(false);
    })

    it('can set and retrieve it', function() {
      var isBelongToCurrentUser = true;
      boardInstanceA.setIsBelongToCurrentUser(isBelongToCurrentUser);
    })
  })

  describe('board published', function() {
    it('if not set, will return false', function() {
      expect(boardInstanceA.published()).to.equal(false);
    })

    it('can set and retrieve it', function() {
      var isPublished = true;
      boardInstanceA.setIsPublished(isPublished);
    })
  })

  describe('if user is not set', function() {
    it('return empty string when get its user name', function() {
      expect(boardInstanceB.getUserName()).to.equal('');
    })

    it('return empty string when get its user profile picture url', function() {
      expect(boardInstanceB.getUserProfilePictureUrl()).to.equal('');
    })
  })
})