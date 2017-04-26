const Vue = require('vue');
const Taggle = require('taggle');
const axios = require('axios');
const Rx = require('rxjs');

const boardComponent = require('./vue_components/board');
const paginationComponent = require('./vue_components/pagination');
const modalComponent = require('./vue_components/modal');
const collaboratorsViewComponent = require('./vue_components/collaborators-view');
const topicSelectorComponent = require('./vue_components/topic-selector');

const Board = require('./models/board');
const User = require('./models/user');

const OddNumber = require('./object_values/odd-number');

const boardCategoryTextHashMap = require('./consts/board-category-text-hash-map');

const boardFactory = require('./factories/board-factory');

const boardService = require('./services/board');
const pageDataService = require('./services/page-data');

const privateState = require('./states/index');

new Vue({
  el : '#app',
  components : {
    'board-component' : boardComponent,
    'pagination-component' : paginationComponent,
    'modal-login' : modalComponent,
    'modal-collaborators' : modalComponent,
    'modal-submit-board' : modalComponent,
    'modal-delete-board-confirmation' : modalComponent,
    
    'collaborators-view' : collaboratorsViewComponent,
    'topic-selector' : topicSelectorComponent
  },
  data : {

    //data state
    privateState : privateState,

    //component state
    subjects : {
      searchQuery : new Rx.Subject()
    },
    inputs : {
      tags : null
    },
    messages : {
      loginModal : {
        error : false,
        content : ''
      }
    },
    errorMessages : {
      'vote-up' : 'Whoops, untuk vote up board ini anda harus login terlebih dahulu',
      'vote-down' : 'Whoops, untuk vote down board ini anda harus login terlebih dahulu' 
    },
    meta : {
      submitBoardModalTitle : 'Buat Board',
      numberOfPaginationDisplayed : new OddNumber(7),
    }
  },
  methods : {
    changeBoardTopic(event) {
      this.privateState.setCurrentBoardTopic(event.target.value);
      this.privateState.goToPage(1);

    },
    resetBoardFormState() {

    },
    changePage(args) {
      this.privateState.goToPage(args.page);
    },
    changeBoardDisplayedCategory(category) {
      this.currentBoardCategory = category;
    },
    getPageData() {
      return pageDataService.getIndex()
        .then(data => {
          this.privateState.setUserLoginState(data.isUserLoggedIn)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getBoards() {
      return this.privateState.goToPage(1);
    },
    showModal(modalName) {
      this.modals[modalName].modal('show');
    },
    showLoginModal() {
      this.messages.loginModal.error = false;
      this.$refs.loginModal.show();
    },
    voteButNotLoggedIn(args) {
      this.messages.loginModal.error = true;
      this.messages.loginModal.content = this.errorMessages[args.voteType];
      this.$refs.loginModal.show(); 
    },
    showCollaborators(args) {
      this.privateState.emptyCollaboratorToBeShown();
      this.privateState.addCollaboratorsToBeShown(this.privateState.getBoards()[args.index].getCollaborators());
      this.$refs.collaboratorsModal.show();
    },
    createBoardButNotLoggedIn() {
      this.messages.loginModal.error = true;
      this.messages.loginModal.content = 'Whoops, untuk membuat board anda harus login terlebih dahulu';
      this.$refs.loginModal.show();
    },
    showSubmitBoardModal() {
      this.$refs.submitBoardModal.show();
    },
    hideSubmitBoardModal() {
      this.$refs.submitBoardModal.hide();
    },
    showSubmitBoardModalToCreate() {
      this.meta.submitBoardModalTitle = 'Buat Board';
      this.showSubmitBoardModal();
    },
    showSubmitBoardModalToEdit() {
      this.meta.submitBoardModalTitle = 'Ubah Board';
      this.showSubmitBoardModal();
    },
    publishBoard() {

    },
    unpublishBoard() {

    },
    showDeleteModalConfirmation() {
      this.$refs.deleteBoardConfirmationModal.show();
    },
    setCurrentBoardCategory(boardCategory) {
      privateState.setCurrentBoardCategory(boardCategory);
      this.privateState.goToPage(1);
    },
    setSearchQuery(event) {
      this.subjects.searchQuery.next(event.target.value);
    },
    onTopicSelected(args) {
      this.privateState.setCurrentBoardTopic(args.topics);
      this.privateState.goToPage(1);
    }
  },
  computed : {
    boardCategoryText() {
      return boardCategoryTextHashMap[this.privateState.getCurrentBoardCategory()];
    }
  },
  mounted() {
    this.subjects.searchQuery
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(searchQuery => {
        this.privateState.setSearchQuery(searchQuery);
        this.privateState.goToPage(1);
      })

    this.inputs.tags = new Taggle('tagsinput', {
      placeholder : 'Masukan Tags'
    });

    this.privateState
      .setService('board', boardService)
      .setFactory('board', boardFactory);
    
    this.getBoards();
    
    this.getPageData();
  }
}) 