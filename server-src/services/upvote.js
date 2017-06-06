const { async, await } = require('asyncawait');
const Upvote = require('../models/upvote');
const baseService = require('./base-service')(Upvote);

module.exports = (() => {
  const create = async((boardId) => {
    return await(baseService.create({
      users : [],
      board : boardId
    }));
  });
  
  const addUpvote = async((boardId, userIdToBeAdded) => {
    return await(baseService.findOneAndUpdate({
      query : {
        board : boardId
      },
      modification : {
        $push : {
          "users": userIdToBeAdded
        }
      }
    }));
  });

  const removeUpvote = async((boardId, userIdToBeRemoved) => {
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
    addUpvote : addUpvote,
    removeUpvote : removeUpvote,
    findById : baseService.findById
  }
})();