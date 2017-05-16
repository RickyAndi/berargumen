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
    TOP : 'top-board',
    COLLABORATED : 'collaborated-board',
    BOOKMARKED :'bookmarked-board',
    NEW : 'new-board',
    ALL : 'all-board'
  },
  errors : {
    board : false
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
  isLoading : false,
  isLoadingMore : false,
  nextPageToLoad : 1,
  anyNextPage : false,
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
  getBoardsFromServer(data) {
    
    let serviceRequestMapping = {};

    serviceRequestMapping[this.boardCategory.MY] = this.services.board.getMy;
    serviceRequestMapping[this.boardCategory.TOP] = this.services.board.getTop;
    serviceRequestMapping[this.boardCategory.COLLABORATED] = this.services.board.getCollaborated;
    serviceRequestMapping[this.boardCategory.BOOKMARKED] = this.services.board.getBookmarked;
    serviceRequestMapping[this.boardCategory.NEW] = this.services.board.getNew;
    serviceRequestMapping[this.boardCategory.ALL] = this.services.board.getAll;
    
    const request = serviceRequestMapping[this.getCurrentBoardCategory()];

    return request(data);
  },
  loadMoreBoards(callback) {
    if(this.isAnyNextPage() && !this.getLoadingState()) {
      if(!this.stillLoadingMore()) {
        console.log('load more');

        this.setIsLoadingMore(true);
        
        const query = {
          page : this.getNextPageToLoad(),
          topic : this.getCurrentBoardTopic(),
          query : this.getSearchQuery()
        }

        this.getBoardsFromServer(query)
          .then((boards) => {
            
            callback();

            this.setIsLoadingMore(false);
            const boardInstances = boards.docs.map(this.factories.board.create);
            this.addBoards(boardInstances);

            const currentPage = parseInt(boards.page);
            const nextPage = currentPage + 1;
            const totalPages = boards.pages;

            if(currentPage >= totalPages) {
              this.setAnyNextPage(false);
            } else {
              this.setAnyNextPage(true);
              this.setNextPageToLoad(nextPage)
            }
          })
          .catch((error) => {
            this.setIsLoadingMore(false);
          });
      }
    }
    console.log('no load more')
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
    this.setLoadingState(true);

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
        this.setLoadingState(false);
        this.setCurrentPage(page);
        this.setTotalPages(data.pages);
        this.setError('board', false);

        const currentPage = parseInt(data.page);
        const nextPage = currentPage + 1;
        const totalPages = data.pages;

        if(currentPage >= totalPages) {
          this.setAnyNextPage(false);
        } else {
          this.setAnyNextPage(true);
          this.setNextPageToLoad(nextPage)
        }
        
        return data;
      }).catch((error) => {
        this.setLoadingState(false);
        this.setError('board', true);
        throw error;
      });
  },
  setLoadingState(isLoading) {
    this.isLoading = isLoading;
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
  }
}

module.exports = state;