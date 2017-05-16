var Vue = require('vue');
var $ = require('jquery');
var expect = require('chai').expect;
var boardComponent = require('./../../vue_components/board');
var Board = require('./../../models/board');
var User = require('./../../models/user');
var sinon = require('sinon');

var boardFactory = require('./../../factories/board-factory'); 

describe('Board component', function() {
  
  after(function() {
    $('body').empty();
  })

  var vm1, vm2, boardDataFromServer, boardDataFromServer2, 
  collaboratorInstances, userInstance, 
  index, boardInstance, boardInstance2, upvoteCallback, 
  downvoteCallback, removeUpvoteCallback, 
  removeDownvoteCallback, showCollaboratorsCallback,
  voteButNotLoggedInCallback, changeBoardCallback,
  deleteBoardCallback, publishBoardCallback, unpublishBoardCallback;

  before(function() {

    index = 1;

    showCollaboratorsCallback = sinon.spy();
    upvoteCallback = sinon.spy();
    downvoteCallback = sinon.spy();
    removeUpvoteCallback = sinon.spy();
    removeDownvoteCallback = sinon.spy();
    voteButNotLoggedInCallback = sinon.spy();
    changeBoardCallback = sinon.spy();
    deleteBoardCallback = sinon.spy();
    publishBoardCallback = sinon.spy();
    unpublishBoardCallback = sinon.spy();

    boardDataFromServer = {
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
      isBelongToCurrentUser : true,
      isPublished : true
    }

    boardDataFromServer2 = {
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
    }

    boardInstance = boardFactory.create(boardDataFromServer);
    boardInstance2 = boardFactory.create(boardDataFromServer2);

    vm1 = new Vue({
      template : 
      `
        <div class="container">
          <div class="row">
            <board
              ref="boardComponent"
              :board="board"
              :index="index"
              @upvote="upvote"
              @downvote="downvote"
              @remove-upvote="removeUpvote"
              @remove-downvote="removeDownvote"
              @show-collaborator="showCollaborators"
              @vote-but-not-logged-in="voteButNotLoggedIn"
              @change-board="changeBoard"
              @delete-board="deleteBoard"
              @publish-board="publishBoard"
              @unpublish-board="unpublishBoard"
              :is-current-user-logged-in="isCurrentUserLoggedIn"
            >
            </board>
          </div>
        </div>
      `,
      components : {
        'board' : boardComponent
      },
      data : {
        board : boardInstance,
        index : index,
        isCurrentUserLoggedIn : true
      },
      methods : {
        upvote : function(args) {
          upvoteCallback(args);
        },
        downvote : function(args) {
          downvoteCallback(args);
        },
        removeUpvote : function(args) {
          removeUpvoteCallback(args);
        },
        removeDownvote : function(args) {
          removeDownvoteCallback(args);
        },
        showCollaborators : function(args) {
          showCollaboratorsCallback(args)
        },
        voteButNotLoggedIn : function(args) {
          voteButNotLoggedInCallback(args);
        },
        changeBoard : function(args) {
          changeBoardCallback(args);
        },
        deleteBoard : function(args) {
          deleteBoardCallback(args);
        },
        publishBoard : function(args) {
          publishBoardCallback(args);
        },
        unpublishBoard : function(args) {
          unpublishBoardCallback(args);
        }
      }
    }).$mount();

    vm2 = new Vue({
      template : 
      `
        <div class="container">
          <div class="row">
            <board
              ref="boardComponent"
              v-bind:board="board"
              v-bind:index="index"
              @upvote="upvote"
              @downvote="downvote"
              @remove-upvote="removeUpvote"
              @remove-downvote="removeDownvote"
              @show-collaborator="showCollaborators"
              @vote-but-not-logged-in="voteButNotLoggedIn"
              :is-current-user-logged-in="isCurrentUserLoggedIn"
            >
            </board>
          </div>
        </div>
      `,
      components : {
        'board' : boardComponent
      },
      data : {
        board : boardInstance,
        index : index,
        isCurrentUserLoggedIn : false
      },
      methods : {
        upvote : function(args) {
          upvoteCallback(args);
        },
        downvote : function(args) {
          downvoteCallback(args);
        },
        removeUpvote : function(args) {
          removeUpvoteCallback(args);
        },
        removeDownvote : function(args) {
          removeDownvoteCallback(args);
        },
        showCollaborators : function(args) {
          showCollaboratorsCallback(args)
        },
        voteButNotLoggedIn : function(args) {
          voteButNotLoggedInCallback(args);
        }
      }
    }).$mount();
  })

  it('can get index from parent element', function() {
    expect(vm1.$refs.boardComponent.index).to.equal(vm1.index);
  })

  it('can get board title in its dom', function() {
    var title = $(vm1.$el).find('.board-title').text();
    expect(title).to.equal(boardInstance.getTitle());
  })

  it('can get count of reason in its dom', function() {
    var countOfReason = $(vm1.$el).find('.reason-count').text();
    var expectedText = boardInstance.getCountOfReason() + ' Alasan';
    expect(countOfReason).to.equal(expectedText);
  })

  it('can get count of objection in its dom', function() {
    var countOfObjection = $(vm1.$el).find('.objection-count').text();
    var expectedText = boardInstance.getCountOfObjection() + ' Keberatan';
    expect(countOfObjection).to.equal(expectedText);
  })

  it('can get count of rebuttal in its dom', function() {
    var countOfRebuttal = $(vm1.$el).find('.rebuttal-count').text();
    var expectedText = boardInstance.getCountOfRebuttal() + ' Bantahan';
    expect(countOfRebuttal).to.equal(expectedText);
  })

  it('can get count of collaborators in its dom', function() {
    var countOfCollaborators = $(vm1.$el).find('.arguers-count').text();
    var expectedText = boardInstance.getCountOfCollaborators() + ' Arguer';
    expect(countOfCollaborators).to.equal(expectedText);
  })

  it('can get board description in its dom', function() {
    var boardDescription = $(vm1.$el).find('.col-md-12').find('.board-description').text();
    expect(boardDescription).to.equal(boardInstance.getDescription());
  })

  it('can get user board name in its dom', function() {
    var boardUserName = $(vm1.$el).find('.board-username').text();
    expect(boardUserName).to.equal(boardInstance.getUserName());
  })

  it('can get right board user profile picture url in its image', function() {
    var $image = $(vm1.$el).find('img');
    expect($image.attr('src')).to.equal(boardInstance.getUserProfilePictureUrl());
  })

  it('can get right number of tags', function() {
    var $tags = $(vm1.$el).find('.board-tags').find('button');
    expect($tags.length).to.equal(3); 
  })

  it('can get right tags text in its dom', function() {
    
    var tag = []; 
    var $tags = $(vm1.$el).find('.board-tags').find('button');
    
    $tags.each(function($tag) {
      tag.push($(this).text())
    })

    expect(tag).to.eql(boardInstance.getTags());
  })

  it('can get right number of upvote in its dom', function() {
    var upvoteCountInDom = $(vm1.$el).find('.col-md-12').find('.upvote-count').text();
    expect(parseInt(upvoteCountInDom)).to.equal(boardInstance.getUpvote());
  })

  it('can get right number of downvote in its dom', function() {
    var downvoteCountInDom = $(vm1.$el).find('.col-md-12').find('.downvote-count').text();
    expect(parseInt(downvoteCountInDom)).to.equal(boardInstance.getDownvote());
  })

  it('can get right topic in its dom', function() {
    var topic = $(vm1.$el).find('.board-topic').text();
    var expectedTopicTextInDom =  boardInstance.getTopic(); 
    expect(topic).to.equal(expectedTopicTextInDom);
  })

  it('when upvote event emit, it invoke callback in its parent with argument', function() {
    vm1.$refs.boardComponent.upvote();
    expect(upvoteCallback.called).to.be.true;
    expect(upvoteCallback.args[0][0].index).to.equal(index)
  })

  it('when downvote event emit, it invoke callback in its parent with argument', function() {
    vm1.$refs.boardComponent.downvote();
    expect(downvoteCallback.called).to.be.true;
    expect(downvoteCallback.args[0][0].index).to.equal(index)
  })

  it('when show-collaborator event emit, it invoke callback in its parent with argument', function() {
    vm1.$refs.boardComponent.showCollaborators();
    expect(showCollaboratorsCallback.called).to.be.true;
    expect(showCollaboratorsCallback.args[0][0].index).to.equal(index)
  })

  it('when remove-upvote event emitted, it invoke callback in its parent with argument', function() {
    vm1.$refs.boardComponent.removeUpvote();
    expect(removeUpvoteCallback.called).to.be.true;
    expect(removeUpvoteCallback.args[0][0].index).to.equal(index)
  })

  it('when remove-downvote event emitted, it invoke callback in its parent with argument', function() {
    vm1.$refs.boardComponent.removeDownvote();
    expect(removeDownvoteCallback.called).to.be.true;
    expect(removeDownvoteCallback.args[0][0].index).to.equal(index)
  })

  describe('upvote and downvote button', function() {
    
    describe('when props isCurrentUserIsLoggedIn is true', function() {
      it('when current user didnt upvote, upvote button exists', function() {
        var $upvoteButton = $(vm1.$el).find('.col-md-12').find('.upvote-button');
        expect($upvoteButton.length).to.equal(1);
      })

      it('when current user upvoted, remove upvote button exists and upvote button should not exist', function(done) {
        vm1.board.setIsCurrentUserUpvoted(true);

        Vue.nextTick(function() {
          var $upvoteButton = $(vm1.$el).find('.col-md-12').find('.upvote-button');
          var $removeUpvoteButton = $(vm1.$el).find('.col-md-12').find('.remove-upvote-button');
          
          expect($upvoteButton.length).to.equal(0);
          expect($removeUpvoteButton.length).to.equal(1);
          done();
        })
      })

      it('when current user didnt downvote, downvote button exists', function() {
        var $downvoteButton = $(vm1.$el).find('.col-md-12').find('.downvote-button');
        expect($downvoteButton.length).to.equal(1);
      })

      it('when current user downvoted, remove downvote button exists and downvote button should not exist', function(done) {
        vm1.board.setIsCurrentUserDownvoted(true);

        Vue.nextTick(function() {
          var $downvoteButton = $(vm1.$el).find('.col-md-12').find('.upvote-button');
          var $removeDownvoteButton = $(vm1.$el).find('.col-md-12').find('.remove-upvote-button');
          
          expect($downvoteButton.length).to.equal(0);
          expect($removeDownvoteButton.length).to.equal(1);
          done();
        })
      })
    })
    
    describe('when props isCurrentUserIsLoggedIn is false', function() {
      
      it('upvote and remove upvote button doesnt exist', function() {
        var $upvoteButton = $(vm2.$el).find('.col-md-12').find('.upvote-button');
        var $removeUpvoteButton = $(vm2.$el).find('.col-md-12').find('.remove-upvote-button');
        
        expect($upvoteButton.length).to.equal(0);
        expect($removeUpvoteButton.length).to.equal(0);
      })

      it('downvote and remove downvote button doesnt exist', function() {
        var $downvoteButton = $(vm2.$el).find('.col-md-12').find('.upvote-button');
        var $removeDownvoteButton = $(vm2.$el).find('.col-md-12').find('.remove-upvote-button');
        
        expect($downvoteButton.length).to.equal(0);
        expect($removeDownvoteButton.length).to.equal(0);
      })

      it('disabled upvote button exists', function() {
        var $disabledUpvoteButton = $(vm2.$el).find('.col-md-12').find('.upvote-disabled-button');
        expect($disabledUpvoteButton.length).to.equal(1);
      })

      it('disabled downvote button exists', function() {
        var $disabledDownvoteButton = $(vm2.$el).find('.col-md-12').find('.downvote-disabled-button');
        expect($disabledDownvoteButton.length).to.equal(1);
      })

      describe('when disabled upvote and downvote button clicked', function() {
        
        it('when vote up button clicked it trigger vote-but-not-logged-in event and its argument, and invoke callback', function() {
          vm2.$refs.boardComponent.voteUpButNotLoggedIn();
          expect(voteButNotLoggedInCallback.called).to.be.true;
          expect(voteButNotLoggedInCallback.args[0][0].voteType).to.equal('vote-up');
        })

        it('when vote down button clicked it trigger vote-but-not-logged-in event and its argument, and invoke callback', function() {
          vm2.$refs.boardComponent.voteDownButNotLoggedIn();
          expect(voteButNotLoggedInCallback.called).to.be.true;
          expect(voteButNotLoggedInCallback.args[1][0].voteType).to.equal('vote-down');
        })
      })
    })

    describe('owner buttons box', function() {

      it('when board is belong to current user, owner buttons box should exist', function() {
        var $buttonsBox = $(vm1.$el).find('.owner-buttons');
        expect($buttonsBox.length).to.equal(1);
      })

      it('when change-board event triggered, it invoke callback in its parent with right argument', function() {
        
        vm1.$refs.boardComponent.changeBoard();
        
        var expectedArgument = { index : 1};

        expect(changeBoardCallback.called).to.be.true;
        expect(changeBoardCallback.args[0][0]).to.eql(expectedArgument);
      })

      it('when delete-board event triggered, it invoke callback in its parent with right argument', function() {

        vm1.$refs.boardComponent.deleteBoard();
        
        var expectedArgument = { index : 1};

        expect(deleteBoardCallback.called).to.be.true;
        expect(deleteBoardCallback.args[0][0]).to.eql(expectedArgument);
      })

      it('when publish-board event triggered, it invoke callback in its parent with right argument', function() {

        vm1.$refs.boardComponent.publishBoard();
        
        var expectedArgument = { index : 1};

        expect(publishBoardCallback.called).to.be.true;
        expect(publishBoardCallback.args[0][0]).to.eql(expectedArgument);
      })

      it('when unpublish-board event triggered, it invoke callback in its parent with right argument', function() {

        vm1.$refs.boardComponent.unpublishBoard();
        
        var expectedArgument = { index : 1};

        expect(unpublishBoardCallback.called).to.be.true;
        expect(unpublishBoardCallback.args[0][0]).to.eql(expectedArgument);
      })

      it('when board is not belong to current user, owner buttons box should not exist', function(done) {
        
        vm1.board.setIsBelongToCurrentUser(false);
        var $buttonsBox = $(vm1.$el).find('.owner-buttons');

        Vue.nextTick(function() {
          expect($buttonsBox.length).to.equal(1);
          done();
        })
      })
    });
  })
});