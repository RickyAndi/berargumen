const http = require('./http');

module.exports = (() => {
  const urls = {
    'my' : '/api/board/my',
    'collaborated' : '/api/board/collaborated',
    'bookmarked' : '/api/board/bookmarked',
    'all' : '/api/board/all',
    'create' : '/api/board/create',
    'publish' : '/api/board/publish/',
    'unpublish' : '/api/board/unpublish/',
    'upvote' : '/api/board/upvote/',
    'downvote' : '/api/board/downvote/',
    'remove-upvote' : '/api/board/remove-upvote/',
    'remove-downvote' : '/api/board/remove-downvote/',
    'bookmark' : '/api/board/bookmark',
    'remove-bookmark' : '/api/board/remove-bookmark',
    'delete' : '/api/board/delete/',
    'edit' : '/api/board/edit/'
  }
  
  function getBookmarked(data) {
    const query = data == null ? {} : data;
    return http.get(urls['bookmarked'], query)
      .then(function(response) {
        return response.data;
      });
  }

  function getCollaborated(data) {
    const query = data == null ? {} : data;
    return http.get(urls['collaborated'], query)
      .then((response) => {
        return response.data;
      });
  }

  function getMy(data) {
    const query = data == null ? {} : data;
    return http.get(urls['my'], query)
      .then((response) => {
        return response.data;
      });
  }

  function getAll(data) {
    const query = data == null ? {} : data;
    return http.get(urls['all'], query)
      .then((response) => {
        return response.data;
      });
  }

  function create(data) {
    return http.post(urls['create'], data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response;
      })
  }

  function publish(boardId) {
    const url = urls['publish'] + boardId; 
    return http.put(url, {})
      .then((response) => {
        return response.data;
      })
  }

  function unpublish(boardId) {
    const url = urls['unpublish'] + boardId; 
    return http.put(url, {})
      .then((response) => {
        return response.data;
      })
  }

  function upvote(boardId) {
    const url = urls['upvote'] + boardId; 
    return http.put(url, {})
      .then((response) => {
        return response.data;
      })
  }

  function downvote(boardId) {
    const url = urls['downvote'] + boardId; 
    return http.put(url, {})
      .then((response) => {
        return response.data;
      })
  }

  function removeUpvote(boardId) {
    const url = urls['remove-upvote'] + boardId; 
    return http.put(url, {})
      .then((response) => {
        return response.data;
      })
  }

  function removeDownvote(boardId) {
    const url = urls['remove-downvote'] + boardId; 
    return http.put(url, {})
      .then((response) => {
        return response.data;
      })
  }
  
  function bookmark(boardId) {
     return http.post(urls['bookmark'], { boardId : boardId })
      .then((response) => {
        return response.data;
      })
  }

  function removeBookmark(boardId) {
     return http.post(urls['remove-bookmark'], { boardId : boardId })
      .then((response) => {
        return response.data;
      })
  }

  function deleteBoard(boardId) {
    return http.delete(urls['delete'] + boardId)
      .then((response) => {
        return response.data;
      })
  }

  function editBoard(boardId, data) {
     return http.put(urls['edit'] + boardId, data)
      .then((response) => {
        return response.data;
      })
  }

  return {
    getMy : getMy,
    getCollaborated : getCollaborated,
    getBookmarked : getBookmarked,
    getAll : getAll,
    create : create,
    publish : publish,
    unpublish : unpublish,
    upvote : upvote,
    downvote : downvote,
    removeUpvote : removeUpvote,
    removeDownvote : removeDownvote,
    bookmark : bookmark,
    removeBookmark : removeBookmark,
    deleteBoard : deleteBoard,
    editBoard : editBoard
  }
})();
