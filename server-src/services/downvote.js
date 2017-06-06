const { async, await } = require('asyncawait');
const Downvote = require('../models/downvote');
const baseService = require('./base-service')(Downvote);

module.exports = (() => {
  const create = async((boardId) => {
    return await(baseService.create({
      users : [],
      board : boardId
    }));
  });
  
  const addDownvote = async((boardId, userIdToBeRemoved) => {
    return await(baseService.findOneAndUpdate({
      query : {
        board : boardId
      },
      modification : {
        $push : {
          "users": userIdToBeRemoved
        }
      }
    }))
  });

  const removeDownvote = async((boardId, userIdToBeRemoved) => {
    return await(baseService.findOneAndUpdate({
      query : {
        board : boardId
      },
      modification : {
        $pull : {
          "users": userIdToBeRemoved
        }
      }
    }))
  });
  
  return {
    create : create,
    addDownvote : addDownvote,
    removeDownvote : removeDownvote,
    findById : baseService.findById
  }
})();