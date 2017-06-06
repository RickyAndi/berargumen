const Vue = require('vue');
const Board = require('../models/board');

const board = Vue.component('board', {
  template : require('../templates/board-v2.html'),
  props : {
    board : {
      type : Board,
      required : true
    },
    index : {
      type : Number,
      required : true
    },
    isCurrentUserLoggedIn : {
      type : Boolean,
      required : true
    }
  },
  data() {
    return {
      viewFullDescription : false
    }
  },
  methods : {
    upvote() {
      this.$emit('upvote', { 
        index : this.index,
        boardId : this.board.getId()
      });
    },
    downvote() {
      this.$emit('downvote', {
        index : this.index,
        boardId : this.board.getId()
      });
    },
    removeDownvote() {
      this.$emit('remove-downvote', {
        index : this.index,
        boardId : this.board.getId()
      });
    },
    removeUpvote() {
      this.$emit('remove-upvote', { 
        index : this.index,
        boardId : this.board.getId()
      });
    },
    showCollaborators() {
      this.$emit('show-collaborator', {
        index : this.index
      });
    },
    voteUpButNotLoggedIn() {
      this.$emit('vote-but-not-logged-in', { voteType : 'vote-up' });
    },
    voteDownButNotLoggedIn() {
      this.$emit('vote-but-not-logged-in', { voteType : 'vote-down' })
    },
    changeBoard() {
      this.$emit('change-board', {
        boardId : this.board.getId(),
        index : this.index
      });
    },
    deleteBoard() {
      this.$emit('delete-board', {
        boardId : this.board.getId(),
        index : this.index
      })
    },
    publishBoard() {
      this.$emit('publish-board', {
        boardId : this.board.getId(),
        index : this.index
      })
    },
    unpublishBoard() {
      this.$emit('unpublish-board', {
        boardId : this.board.getId(),
        index : this.index
      })
    },
    showBoard() {
      window.open('/board');
    },
    seeFullDescription() {
      this.viewFullDescription = true;
    },
    seeLessDescription() {
      this.viewFullDescription = false;
    },
    bookmark() {
      this.$emit('bookmark', {
        boardId : this.board.getId(),
        index : this.index
      });
    },
    removeBookmark() {
      this.$emit('remove-bookmark', {
        boardId : this.board.getId(),
        index : this.index
      });
    }
  }
})

module.exports = board;
