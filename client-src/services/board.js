const http = require('./http');

module.exports = (() => {
  const urls = {
    'top' : '/api/board/featured',
    'my' : '/api/board/my',
    'collaborated' : '/api/board/collaborated',
    'new' : '/api/board/new',
    'bookmarked' : '/api/board/bookmarked',
    'all' : '/api/board/all'
  }

  function getTop(data) {
    const query = data == null ? {} : data;
    return http.get(urls['top'], query)
      .then(function(response) {
        return response.data;
      });
  }

  function getNew(data) {
    const query = data == null ? {} : data;
    return http.get(urls['new'], query)
      .then(function(response) {
        return response.data;
      });
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
      .then(function(response) {
        return response.data;
      });
  }

  function getMy(data) {
    const query = data == null ? {} : data;
    return http.get(urls['my'], query)
      .then(function(response) {
        return response.data;
      });
  }

  function getAll(data) {
    const query = data == null ? {} : data;
    return http.get(urls['all'], query)
      .then(function(response) {
        return response.data;
      });
  }

  return {
    getTop : getTop,
    getMy : getMy,
    getCollaborated : getCollaborated,
    getNew : getNew,
    getBookmarked : getBookmarked,
    getAll : getAll
  }
})();
