var indexState = require('../../states/index');
var expect = require('chai').expect;
var sinon = require('sinon');
var boardFactory = require('../../factories/board-factory');
var User = require('../../models/user');



describe('state index', function() {
  
  var fakeBoardService, pageDataFromServerPromise, fakePageDataService, fakeBoardFactory, boardsDataFromServer, boardsInstances, boardsDataFromServerPromise, pageDataFromServer;

  before(function() {
    pageDataFromServer = {
      isUserLoggedIn : true
    }

    boardsDataFromServer = [
      {
        title : 'Tuhan ada',
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices, libero ac laoreet pellentesque, dui eros congue eros, ut consectetur magna ex eu magna. Proin feugiat ornare euismod. Donec in quam pharetra, gravida dolor et, eleifend lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed sit amet mattis tellus, sit amet varius tellus. Quisque massa nisl, tincidunt quis nibh et, tincidunt efficitur erat. Phasellus vestibulum dictum dictum. Donec dolor libero, blandit vestibulum dignissim non, accumsan vitae mi. Integer eu quam vel urna efficitur molestie. Morbi ullamcorper tempus ante. Nulla turpis dui, vestibulum eu pulvinar nec, fermentum eu quam. Nunc a sem non nulla eleifend varius vel ut nunc. Nulla facilisi. In accumsan pulvinar purus in commodo.',
        topic : 'Agama',
        countOfReason : 10,
        countOfObjection : 20,
        countOfRebuttal : 25,
        tags : ['bumi', 'bulat', 'mama'],
        downvote : 100,
        upvote : 20,
        isCurrentUserUpvoted : true,
        isCurrentUserDownvoted : false,
        isPublished : false,
        isBelongToCurrentUser : true,
        collaborators : [
          {
            name : 'Budiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Janjiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Ardiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Budiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Janjiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Ardiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Budiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Janjiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Ardiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Budiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Janjiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Ardiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          }
        ],
        user : {
          name : 'Jangkrikman',
          profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
        }
      },
      {
        title : 'Tuhan ada',
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices, libero ac laoreet pellentesque, dui eros congue eros, ut consectetur magna ex eu magna. Proin feugiat ornare euismod. Donec in quam pharetra, gravida dolor et, eleifend lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed sit amet mattis tellus, sit amet varius tellus. Quisque massa nisl, tincidunt quis nibh et, tincidunt efficitur erat. Phasellus vestibulum dictum dictum. Donec dolor libero, blandit vestibulum dignissim non, accumsan vitae mi. Integer eu quam vel urna efficitur molestie. Morbi ullamcorper tempus ante. Nulla turpis dui, vestibulum eu pulvinar nec, fermentum eu quam. Nunc a sem non nulla eleifend varius vel ut nunc. Nulla facilisi. In accumsan pulvinar purus in commodo.',
        topic : 'Agama',
        countOfReason : 10,
        countOfObjection : 20,
        countOfRebuttal : 25,
        downvote : 100,
        upvote : 20,
        isCurrentUserUpvoted : false,
        isCurrentUserDownvoted : false,
        isPublished : true,
        isBelongToCurrentUser : false,
        tags : ['bumi', 'bulat', 'mama'],
        collaborators : [
          {
            name : 'Budiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Janjiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Ardiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          }
        ],
        user : {
          name : 'Jangkrikman',
          profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
        }
      },
      {
        title : 'Tuhan ada',
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices, libero ac laoreet pellentesque, dui eros congue eros, ut consectetur magna ex eu magna. Proin feugiat ornare euismod. Donec in quam pharetra, gravida dolor et, eleifend lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed sit amet mattis tellus, sit amet varius tellus. Quisque massa nisl, tincidunt quis nibh et, tincidunt efficitur erat. Phasellus vestibulum dictum dictum. Donec dolor libero, blandit vestibulum dignissim non, accumsan vitae mi. Integer eu quam vel urna efficitur molestie. Morbi ullamcorper tempus ante. Nulla turpis dui, vestibulum eu pulvinar nec, fermentum eu quam. Nunc a sem non nulla eleifend varius vel ut nunc. Nulla facilisi. In accumsan pulvinar purus in commodo.',
        topic : 'Agama',
        countOfReason : 10,
        countOfObjection : 20,
        countOfRebuttal : 25,
        downvote : 100,
        upvote : 20,
        isCurrentUserUpvoted : false,
        isCurrentUserDownvoted : false,
        isPublished : true,
        isBelongToCurrentUser : true,
        tags : ['bumi', 'bulat', 'mama'],
        collaborators : [
          {
            name : 'Budiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Janjiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Ardiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          }
        ],
        user : {
          name : 'Jangkrikman',
          profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
        }
      },
      {
        title : 'Tuhan ada',
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices, libero ac laoreet pellentesque, dui eros congue eros, ut consectetur magna ex eu magna. Proin feugiat ornare euismod. Donec in quam pharetra, gravida dolor et, eleifend lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed sit amet mattis tellus, sit amet varius tellus. Quisque massa nisl, tincidunt quis nibh et, tincidunt efficitur erat. Phasellus vestibulum dictum dictum. Donec dolor libero, blandit vestibulum dignissim non, accumsan vitae mi. Integer eu quam vel urna efficitur molestie. Morbi ullamcorper tempus ante. Nulla turpis dui, vestibulum eu pulvinar nec, fermentum eu quam. Nunc a sem non nulla eleifend varius vel ut nunc. Nulla facilisi. In accumsan pulvinar purus in commodo.',
        topic : 'Agama',
        countOfReason : 10,
        countOfObjection : 20,
        countOfRebuttal : 25,
        downvote : 100,
        upvote : 20,
        isCurrentUserUpvoted : false,
        isCurrentUserDownvoted : false,
        isPublished : true,
        isBelongToCurrentUser : true,
        tags : ['bumi', 'bulat', 'mama'],
        collaborators : [
          {
            name : 'Budiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Janjiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          },
          {
            name : 'Ardiman',
            profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
          }
        ],
        user : {
          name : 'Jangkrikman',
          profilePictureUrl : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/483974_560790623950281_1785245479_n.jpg?oh=090209cb5b089d0f5133d8211050bcc6&oe=5966C542'
        }
      }
    ];

    pageDataFromServerPromise = new Promise(function(resolve, reject) {
      resolve(pageDataFromServer);
    })

    boardsDataFromServerPromise = new Promise(function(resolve, reject) {
      resolve({
        docs : boardsDataFromServer,
        pages : 1
      })
    })

    boardsInstances = boardsDataFromServer.map(boardFactory.create);

    fakeBoardService = {
      getTop : sinon.stub().withArgs().returns(boardsDataFromServerPromise),
      getNew : sinon.stub().withArgs().returns(boardsDataFromServerPromise),
      getCollaborated : sinon.stub().withArgs().returns(boardsDataFromServerPromise),
      getMy : sinon.stub().withArgs().returns(boardsDataFromServerPromise),
      getBookmarked : sinon.stub().withArgs().returns(boardsDataFromServerPromise),
      getAll : sinon.stub().withArgs().returns(boardsDataFromServerPromise)
    }

    fakeBoardFactory = {
      create : sinon.stub().withArgs().returns(boardsInstances)
    }

    fakePageDataService = {
      getIndexData : sinon.stub().withArgs().returns(pageDataFromServerPromise)
    }

    indexState
      .setService('board', fakeBoardService)
      .setService('pageData', fakePageDataService)
      .setFactory('board', fakeBoardFactory);
  })
  
  describe('current board category field', function() {
    it('on first time, current board category is "all-board"', function() {
      var expectedCurrentBoardCategory = 'all-board';
      
      expect(indexState.getCurrentBoardCategory()).to.equal(expectedCurrentBoardCategory);
    })

    it('can set category and retrieve it', function() {
      var expectedCurrentBoardCategory = indexState.boardCategory.MY;
      indexState.setCurrentBoardCategory(indexState.boardCategory.MY);
      
      expect(indexState.getCurrentBoardCategory()).to.equal(expectedCurrentBoardCategory);
    }) 
  })
  
  describe('boards field', function() {

    it('on first time, it is empty array', function() {
      expect(indexState.getBoards()).to.be.empty;
    })

    describe('can be added by calling board service', function() {
      
      it('when current board category is "top-board", when invoke getBoardsFromServer(), it will call boardService.getTop()', function(done) {
        
        indexState.setCurrentBoardCategory(indexState.boardCategory.TOP);
        
        expect(indexState.getCurrentBoardCategory()).to.equal(indexState.boardCategory.TOP);

        indexState.getBoardsFromServer()
          .then(function() {
            expect(fakeBoardService.getTop.called).to.be.true;
            expect(indexState.getBoards().length).to.equal(boardsDataFromServer.length);
            done();
          });
      })

      it('when current board category is "my-board", when invoke getBoardsFromServer(), it will call boardService.getMy()', function(done) {
        
        indexState.setCurrentBoardCategory(indexState.boardCategory.MY);
        
        expect(indexState.getCurrentBoardCategory()).to.equal(indexState.boardCategory.MY);

        indexState.getBoardsFromServer()
          .then(function() {
            expect(fakeBoardService.getMy.called).to.be.true;
            expect(indexState.getBoards().length).to.equal(boardsDataFromServer.length);
            done();
          });
      })

      it('when current board category is "collaborated-board", when invoke getBoardsFromServer(), it will call boardService.getCollaborated()', function(done) {
        
        indexState.setCurrentBoardCategory(indexState.boardCategory.COLLABORATED);
        
        expect(indexState.getCurrentBoardCategory()).to.equal(indexState.boardCategory.COLLABORATED);

        indexState.getBoardsFromServer()
          .then(function() {
            expect(fakeBoardService.getCollaborated.called).to.be.true;
            expect(indexState.getBoards().length).to.equal(boardsDataFromServer.length);
            done();
          });
      })

      it('when current board category is "bookmarked-board", when invoke getBoardsFromServer(), it will call boardService.getBookmarked()', function(done) {
        
        indexState.setCurrentBoardCategory(indexState.boardCategory.BOOKMARKED);
        
        expect(indexState.getCurrentBoardCategory()).to.equal(indexState.boardCategory.BOOKMARKED);

        indexState.getBoardsFromServer()
          .then(function() {
            expect(fakeBoardService.getBookmarked.called).to.be.true;
            expect(indexState.getBoards().length).to.equal(boardsDataFromServer.length);
            done();
          });
      })

      it('when current board category is "new-board", when invoke getBoardsFromServer(), it will call boardService.getNew()', function(done) {
        
        indexState.setCurrentBoardCategory(indexState.boardCategory.NEW);
        
        expect(indexState.getCurrentBoardCategory()).to.equal(indexState.boardCategory.NEW);

        indexState.getBoardsFromServer()
          .then(function() {
            expect(fakeBoardService.getNew.called).to.be.true;
            expect(indexState.getBoards().length).to.equal(boardsDataFromServer.length);
            done();
          });
      })

      it('when current board category is "all-board", when invoke getBoardsFromServer(), it will call boardService.getAll()', function(done) {
        
        indexState.setCurrentBoardCategory(indexState.boardCategory.ALL);
        
        expect(indexState.getCurrentBoardCategory()).to.equal(indexState.boardCategory.ALL);

        indexState.getBoardsFromServer()
          .then(function() {
            expect(fakeBoardService.getAll.called).to.be.true;
            expect(indexState.getBoards().length).to.equal(boardsDataFromServer.length);
            done();
          });
      })
    })
  })

  describe('getPageData() function, will return promise, when resolved, will change the following field', function() {
    
    it('on first init, .getUserLoginState() value is false', function() {
      expect(indexState.getUserLoginState()).to.not.be.true;
    })

    it('when invoked, will call pageDataService.getIndexData()', function(done) {
      indexState.getPageData()
        .then(function() {
          expect(fakePageDataService.getIndexData.called).to.be.true;
          done();
        })
    })
    
    it('after request from server, value of .getUserLoginState() will change depends on value from server', function() {
      expect(indexState.getUserLoginState()).to.equal(pageDataFromServer.isUserLoggedIn);
    })
  })

  describe('current board topic', function() {
    it('on first init, its value is "semua"', function() {
      var expectedTopic = 'semua';
      expect(indexState.getCurrentBoardTopic()).to.equal(expectedTopic);
    })

    it('can be set and get', function() {
      var newTopic = 'filsafat';
      indexState.setCurrentBoardTopic(newTopic);
      expect(indexState.getCurrentBoardTopic()).to.equal(newTopic);
    })
  })

  describe('collaborators to be shown field', function() {
    it('on first init, its value is empty array', function() {
      expect(indexState.getCollaboratorsToBeShown()).to.be.empty;
    })

    it('can be added and get', function() {
      
      var collaborators = [
        (new User()).setId('123').setName('budi').setProfilePictureUrl('http://google.com'),
        (new User()).setId('124').setName('janjiman').setProfilePictureUrl('http://google.com'),
      ]

      indexState.addCollaboratorsToBeShown(collaborators);
      expect(indexState.getCollaboratorsToBeShown().length).to.equal(collaborators.length);

      var collaborator = (new User()).setId('123').setName('budi').setProfilePictureUrl('http://google.com');

      var expectedLength = collaborators.length + 1;
      indexState.addCollaboratorToBeShown(collaborator);
      expect(indexState.getCollaboratorsToBeShown().length).to.equal(expectedLength);
    })

    it('can be emptied', function() {
      indexState.emptyCollaboratorToBeShown();
      expect(indexState.getCollaboratorsToBeShown().length).to.equal(0);
    })
  })
})