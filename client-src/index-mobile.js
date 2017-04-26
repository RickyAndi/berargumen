const Vue = require('vue');
const Taggle = require('taggle');
const NProgress = require('nprogress');
const alertify = require('alertifyjs');
const boardCategoryTextHashMap = require('./consts/board-category-text-hash-map');
const fullscreenModalComponent = require('./vue_components/fullscreen-modal');

new Vue({
  el:'#app',
  data : {
    currentBoardCategory : 'top-board',
    inputs : {
      tags : null
    }
  },
  components : {
    'fullscreen-modal' : fullscreenModalComponent
  },
  methods : {
    changeBoardDisplayedCategory(category) {
      this.currentBoardCategory = category;
    },
    showSubmitBoardModal() {
      this.$refs.fullModal.show();
      //alertify.success('Success Message');
    },
    hideSubmitBoardModal() {
      this.$refs.fullModal.hide();
    }
  },
  computed : {
    boardCategoryText() {
      return boardCategoryTextHashMap[this.currentBoardCategory];
    }
  },
  mounted() {
    this.inputs.tags = new Taggle('tagsinput', {
      placeholder : 'Masukan Tags'
    });

    NProgress.configure({ showSpinner: false });
    NProgress.start();
    NProgress.done();
  }
})
