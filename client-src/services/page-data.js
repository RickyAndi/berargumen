const http = require('./http');

module.exports = (() => {
  
  const urls = {
    'index' : '/api/page-data/index',

  }

  function getIndex(data) {
    const query = data == null ? {} : data;
    return http.get(urls['index'], query)
      .then(function(response) {
        return response.data;
      });
  }

  return {
    getIndex : getIndex
  }

})();
