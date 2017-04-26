const Vue = require('vue');
const Board = require('../models/board');

const board = Vue.component('board', {
  template : require('../templates/board.html'),
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
        index : this.index
      });
    },
    downvote() {
      this.$emit('downvote', {
        index : this.index
      });
    },
    removeDownvote() {
      this.$emit('remove-downvote', {
        index : this.index
      });
    },
    removeUpvote() {
      this.$emit('remove-upvote', { 
        index : this.index
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
        index : this.index
      });
    },
    deleteBoard() {
      this.$emit('delete-board', {
        index : this.index
      })
    },
    publishBoard() {
      this.$emit('publish-board', {
        index : this.index
      })
    },
    unpublishBoard() {
      this.$emit('unpublish-board', {
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
    }
  }
})

module.exports = board;
