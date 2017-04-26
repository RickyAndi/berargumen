const axios = require('axios');

module.exports = (() => {
  function get(url, data) {
    return axios.get(url, {
      params : data != null ? data : {}
    })
  }

  function post(url, data) {
    if(data == null) {
      data = {}
    }
    return axios.post(url, data);
  }

  function put(url, data) {
    if(data == null) {
      data = {}
    }
    return axios.post(url, data);
  }

  function remove(url) {
    return axios.delete(url);
  }

  return {
    get : get,
    post : post,
    put : put,
    delete : remove
  }
})();
