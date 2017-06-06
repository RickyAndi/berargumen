const Vue = require('vue');
const axios = require('axios');
const Rx = require('rxjs');
const infiniteScroll = require('vue-infinite-scroll');

const boardComponent = require('./vue_components/board');
const paginationComponent = require('./vue_components/pagination');
const modalComponent = require('./vue_components/modal');
const collaboratorsViewComponent = require('./vue_components/collaborators-view');
const topicSelectorComponent = require('./vue_components/topic-selector');
const inputTagComponent = require('./vue_components/vue-input-tag');
const argumentForm = require('./vue_components/argument-form');

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
  directives: { infiniteScroll },
  components : {
    'board-component' : boardComponent,
    'pagination-component' : paginationComponent,
    'modal-login' : modalComponent,
    'modal-submit-board' : modalComponent,
    'modal-delete-board-confirmation' : modalComponent,
    'input-tag-component' : inputTagComponent,
    'argument-form': argumentForm
  },
  data : {
    //data state
    privateState : privateState,
    //component state
    subjects : {
      searchQuery : new Rx.Subject()
    },
    errorMessages : {
      'vote-up' : 'Hei, untuk vote up argumen ini anda harus login terlebih dahulu',
      'vote-down' : 'Hei, untuk vote down argumen ini anda harus login terlebih dahulu' 
    },
    messages: {
      loginModal: {
        error: false,
        content: ''
      }
    },
    currentUserProfilePicUrl : null,
    currentUserName : null,
    boardIdToBeDeleted : null,
    boardIndexToBeDeleted : null,
    boardIdToBeEdited : null,
    boardIndexToBeEdited : null,
  },
  methods : {
    onMounted() {
        this.subjects.searchQuery
          .debounceTime(1000)
          .distinctUntilChanged()
          .subscribe(searchQuery => {
            this.privateState.setSearchQuery(searchQuery);
            this.privateState.goToPage(1);
            this.scrollBoardListToTop();
          });
        this.privateState
          .setService('board', boardService)
          .setFactory('board', boardFactory);
        
        this.getBoards();

        this.getPageData()
          .then(data => {
            this.currentUserProfilePicUrl = data.currentUserProfilePicUrl;
            this.currentUserName = data.currentUserName;
          });
    },
    changeBoardTopic(event) {
      this.privateState.setCurrentBoardTopic(event.target.value);
      this.privateState.goToPage(1);
    },
    onArgumenSubmitFormHide() {
      this.$refs.argumentForm.reset();
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
          this.privateState.setUserLoginState(data.isUserLoggedIn);
          return data;
        })
        .catch(error => {
          throw error;
        })
    },
    getBoards() {
      return this.privateState.goToPage(1);
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
      this.messages.loginModal.content = 'Whoops, untuk membuat argumen anda harus login terlebih dahulu';
      this.$refs.loginModal.show();
    },
    showSubmitBoardModal() {
      this.$refs.submitBoardModal.show();
    },
    hideSubmitBoardModal() {
      this.$refs.submitBoardModal.hide();
    },
    showSubmitBoardModalToCreate() {
      this.$refs.argumentForm.setStatus('create');
      this.showSubmitBoardModal();
    },
    showSubmitBoardModalToEdit(args) {
      this.$refs.argumentForm.setStatus('edit');
      const data = this.privateState.getBoardDataToEdit(args.index);
      this.$refs.argumentForm.setFormData(data);
      
      this.boardIdToBeEdited = args.boardId;
      this.boardIndexToBeEdited = args.index;
      
      this.showSubmitBoardModal();
    },
    publishBoard(args) {
      const boardId = args.boardId;
      boardService.publish(boardId)
        .then((data) => {
          this.privateState.setBoardPublicationState(args.index, true);
        })
    },
    unpublishBoard(args) {
      const boardId = args.boardId;
      boardService.unpublish(boardId)
        .then((data) => {
          this.privateState.setBoardPublicationState(args.index, false)
        })
    },
    showDeleteModalConfirmation() {
      this.$refs.deleteBoardConfirmationModal.show();
    },
    hideDeleteModalConfirmation() {
       this.$refs.deleteBoardConfirmationModal.hide();
    },
    setCurrentBoardCategory(boardCategory) {
      privateState.setCurrentBoardCategory(boardCategory);
      this.privateState.goToPage(1);
      this.scrollBoardListToTop();
    },
    setSearchQuery(event) {
      this.subjects.searchQuery.next(event.target.value);
    },
    onTopicSelected(args) {
      this.privateState.setCurrentBoardTopic(args.topics);
      this.privateState.goToPage(1);
      this.scrollBoardListToTop();
    },
    facebookLogin() {
      window.location.href="/auth/facebook";
    },
    localLogin() {
      window.location.href="/auth/local";
    },
    goToProfilePage() {
      window.location.href="/profile"
    },
    logout() {
      window.location.href="/auth/logout";
    },
    loadMoreBoards() {
      this.privateState.loadMoreBoards();
    },
    scrollBoardListToTop() {
      const boardList = document.querySelector('.board-list-container');
      const topPos = boardList.offsetTop;
      boardList.scrollTop = 0;
    },
    upvote(args) {
      return boardService.upvote(args.boardId)
        .then((data) => {
          this.privateState.currentUserUpvoteBoard(args.index);
        })
    },
    downvote(args) {
      return boardService.downvote(args.boardId)
        .then((data) => {
          this.privateState.currentUserDownvoteBoard(args.index);
        })
    },
    removeUpvote(args) {
      return boardService.removeUpvote(args.boardId)
        .then((data) => {
          this.privateState.currentUserNotUpvoteBoard(args.index);
        })
    },
    removeDownvote(args) {
      return boardService.removeDownvote(args.boardId)
        .then((data) => {
          this.privateState.currentUserNotDownvoteBoard(args.index);
        });
    },
    bookmark(args) {
      return boardService.bookmark(args.boardId)
        .then((data) => {
          this.privateState.currentUserBookmarkBoard(args.index);
        });
    },
    removeBookmark(args) {
      return boardService.removeBookmark(args.boardId)
        .then((data) => {
          this.privateState.currentUserRemoveBookmarkBoard(args.index);
        });
    },
    handleDeleteBoard(args) {
      this.boardIdToBeDeleted = args.boardId;
      this.boardIndexToBeDeleted = args.index;
      this.showDeleteModalConfirmation();
    },
    deleteBoard() {
      const toBeDeletedBoardId = this.boardIdToBeDeleted;
      return boardService.deleteBoard(toBeDeletedBoardId)
        .then((data) => {
          this.hideDeleteModalConfirmation();
          this.privateState.removeBoard(this.boardIndexToBeDeleted);
        })
    },
    closeSubmitBoardModal() {
       this.hideSubmitBoardModal();
    },
    saveArgument(argumentData) {
      this.$refs.argumentForm.setLoading(true);

      if(this.$refs.argumentForm.statusIsCreate()) {
        return boardService.create(argumentData)
          .then((data) => {
            console.log(data)
            this.$refs.argumentForm.setLoading(false);
            this.hideSubmitBoardModal();
            window.open('/board/' + data.slug);
          })
          .catch((error) => {
            if(error.data.validationError) {
              this.$refs.argumentForm.setError(error.data.errors);
            }

            this.$refs.argumentForm.setLoading(false);
          })
      }

      return boardService.editBoard(this.boardIdToBeEdited, argumentData)
        .then((data) => {
          this.$refs.argumentForm.setLoading(false);
          this.hideSubmitBoardModal();
        })
        .catch((error) => {
          console.log(error)
          this.$refs.argumentForm.setLoading(false);
        })
    }
  },
  computed : {
    boardCategoryText() {
      return boardCategoryTextHashMap[this.privateState.getCurrentBoardCategory()];
    },
    isAnyNextPage() {
      return this.privateState.isAnyNextPage();
    },
    isLoadMoreLoading() {
      return this.privateState.isLoading('loadMore');
    },
    isLoadBoardLoading() {
      return this.privateState.isLoading('board')
    },
    boardError() {
      return this.privateState.getError('board');
    },
    loadMoreError() {
      return this.privateState.getError('loadMore');
    },
    boards() {
      return this.privateState.getBoards();
    },
    viewBoardsLists() {
      return !this.isLoadBoardLoading && !this.boardError;
    },
    isUserLogin() {
      return this.privateState.getUserLoginState()
    },
    viewLoadBoardError() {
      return this.boardError;
    },
    viewLoadMoreLoading() {
      return this.isLoadMoreLoading;
    },
    viewLoadMoreError() {
      return this.loadMoreError;
    },
    viewThereIsNoBoardsToLoad() {
      return !this.loadMoreError && !this.isAnyNextPage && !this.isLoadMoreLoading && !this.isLoadBoardLoading
    },
    warnThatUserCannotViewBoardExceptAllBoard() {
      return !this.isUserLogin && (this.privateState.getCurrentBoardCategory() !== this.privateState.boardCategory.ALL);
    },
    noBoardsToBeViewed() {
      return this.boards.length === 0;
    }
  },
  mounted() {
    this.onMounted();
  }
}) 