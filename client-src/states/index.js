var state = {
  services : {
    board : null,
    pageData : null
  },
  factories : {
    board : null
  },
  boardCategory : {
    MY : 'my-board',
    COLLABORATED : 'collaborated-board',
    BOOKMARKED :'bookmarked-board',
    ALL : 'all-board'
  },
  errors : {
    board : false,
    loadMore : false
  },
  loadings : {
    board : false,
    loadMore : false
  },
  topics : '',
  currentBoardCategory : 'all-board',
  boards : [],
  isUserLoggedIn : false,
  currentBoardTopic : 'semua',
  collaboratorToBeShown : [],
  totalPages : 0,
  currentPage : 1,
  searchQuery : '',
  nextPageToLoad : 1,
  anyNextPage : true,
  setService(serviceName, serviceInstance) {
    this.services[serviceName] = serviceInstance;
    return this;
  },
  setFactory(factoryName, factoryInstance) {
    this.factories[factoryName] = factoryInstance;
    return this;
  }, 
  setCurrentBoardCategory(category) {
    this.currentBoardCategory = category;
  },
  getCurrentBoardCategory() {
    return this.currentBoardCategory;
  },
  addBoard(board) {
    this.boards.push(board);
  },
  addBoards(boards) {
    boards.forEach((board) => {
      this.addBoard(board);
    })
  },
  getBoards() {
    return this.boards;
  },
  emptyBoards() {
    this.boards.splice(0, this.boards.length);
  },
  setLoading(name, bool) {
    this.loadings[name] = bool;
    return this;
  },
  isLoading(name) {
    return this.loadings[name];
  },
  getBoardsFromServer(data) {
    
    let serviceRequestMapping = {};

    serviceRequestMapping[this.boardCategory.MY] = this.services.board.getMy;
    serviceRequestMapping[this.boardCategory.COLLABORATED] = this.services.board.getCollaborated;
    serviceRequestMapping[this.boardCategory.BOOKMARKED] = this.services.board.getBookmarked;
    serviceRequestMapping[this.boardCategory.ALL] = this.services.board.getAll;
    
    const request = serviceRequestMapping[this.getCurrentBoardCategory()];

    return request(data);
  },
  loadMoreBoards() {
    if(this.isAnyNextPage() && !this.isLoading('board') && !this.isLoading('loadMore')) {
      this.setLoading('loadMore', true);
      
      const query = {
        page : this.getNextPageToLoad(),
        topic : this.getCurrentBoardTopic(),
        query : this.getSearchQuery()
      }

      this.getBoardsFromServer(query)
        .then((boards) => {
          
          this.setLoading('loadMore', false);
          this.setError('loadMore', false);

          const boardInstances = boards.docs.map(this.factories.board.create);
          this.addBoards(boardInstances);

          this.decideThatThereAreNextPage(boards);

        })
        .catch((error) => {
          this.setLoading('loadMore', false);
          this.setError('loadMore', true);
        });
    }
  },
  setUserLoginState(isLoggedIn) {
    this.isUserLoggedIn = isLoggedIn;
  },
  getUserLoginState() {
    return this.isUserLoggedIn;
  },
  getPageData() {
    return this.services['pageData'].getIndexData()
      .then((data) => {
        this.setUserLoginState(data.isUserLoggedIn);
      })
  },
  setCurrentBoardTopic(boardTopic) {
    this.currentBoardTopic = boardTopic;
  },
  getCurrentBoardTopic() {
    return this.currentBoardTopic;
  },
  addCollaboratorToBeShown(user) {
    this.collaboratorToBeShown.push(user);
  },
  addCollaboratorsToBeShown(users) {
    users.forEach((user) => {
      this.addCollaboratorToBeShown(user);
    })
  },
  getCollaboratorsToBeShown() {
    return this.collaboratorToBeShown;
  },
  emptyCollaboratorToBeShown() {
    this.collaboratorToBeShown.splice(0, state.collaboratorToBeShown.length);
  },
  setCurrentPage(page) {
    this.currentPage = page;
  },
  getCurrentPage() {
    return this.currentPage;
  },
  setTotalPages(totalPages) {
    this.totalPages = totalPages
  },
  getTotalPages() {
    return this.totalPages;
  },
  setSearchQuery(searchQuery) {
    this.searchQuery = searchQuery;
  },
  getSearchQuery() {
    return this.searchQuery;
  },
  goToPage(page) {
    this.setLoading('board', true);

    const query = {
      page : page,
      topic : this.getCurrentBoardTopic(),
      query : this.getSearchQuery()
    }

    return this.getBoardsFromServer(query)
      .then((boards) => {
        this.emptyBoards();
        var boardInstances = boards.docs.map(this.factories.board.create);
        this.addBoards(boardInstances);
        
        return boards;
      })
      .then((data) => {
        this.setLoading('board', false);
        this.setError('board', false);

        this.setCurrentPage(page);
        this.setTotalPages(data.pages);

        this.decideThatThereAreNextPage(data)

        return data;
      }).catch((error) => {
        this.setLoading('board', false);
        this.setError('board', true);
        throw error;
      });
  },
  getLoadingState() {
    return this.isLoading;
  },
  getError(name) {
    return this.errors[name];
  },
  setError(name, isError) {
    this.errors[name] = isError;
    return this;
  },
  setIsLoadingMore(bool) {
    this.isLoadingMore = bool;
  },
  stillLoadingMore() {
    return this.isLoadingMore;
  },
  setNextPageToLoad(nextPage) {
    this.nextPageToLoad = nextPage;
  },
  getNextPageToLoad() {
    return this.nextPageToLoad;
  },
  setAnyNextPage(bool) {
    this.anyNextPage = bool;
  },
  isAnyNextPage() {
    return this.anyNextPage;
  },
  decideThatThereAreNextPage(data) {
    const currentPage = parseInt(data.page);
    const nextPage = currentPage + 1;
    const totalPages = data.pages;

    if(currentPage >= totalPages) {
      this.setAnyNextPage(false);
    } else {
      this.setAnyNextPage(true);
      this.setNextPageToLoad(nextPage)
    }
  },
  setBoardPublicationState(index, bool) {
    this.boards[index].setIsPublished(bool);
  },
  currentUserUpvoteBoard(index) {
    this.boards[index].currentUserDoUpvote();
  },
  currentUserDownvoteBoard(index) {
    this.boards[index].currentUserDoDownvote();
  },
  currentUserNotUpvoteBoard(index) {
    this.boards[index].currentUserDoRemoveUpvote();
  },
  currentUserNotDownvoteBoard(index) {
    this.boards[index].currentUserDoRemoveDownvote();
  },
  currentUserBookmarkBoard(index) {
    this.boards[index].setIsCurrentUserBookmarked(true);
  },
  currentUserRemoveBookmarkBoard(index) {
    this.boards[index].setIsCurrentUserBookmarked(false);
  },
  removeBoard(index) {
    this.boards.splice(index, 1);
  },
  getBoardDataToEdit(index) {
    return {
      title : this.boards[index].getTitle(),
      description : this.boards[index].getDescription(),
      tags : this.boards[index].getTags()
    }
  }
}

module.exports = state;