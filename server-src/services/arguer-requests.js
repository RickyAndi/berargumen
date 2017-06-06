const { async, await } = require('asyncawait');
const ArguerRequests = require('../models/arguer-requests');
const baseService = require('./base-service')(ArguerRequests);

module.exports = (() => {
  const create = async((boardId) => {
    const toBeCreatedArguerRequests = new ArguerRequests({
      board : boardId,
      users : []
    });
    const newArguerRequests = await(toBeCreatedArguerRequests.save());
    return newArguerRequests;
  });
  
  const addArguerRequest = async((boardId, userIdToBeAdded) => {
    const arguerRequestWithAddition = await(ArguerRequests
      .findOneAndUpdate({ 
        board : boardId,
      }, {
        $push: { 
          "users": userIdToBeAdded
        }
      }));
    return arguerRequestWithAddition;
  });

  return {
    create : create,
    addArguerRequest : addArguerRequest,
    findById : baseService.findById
  }
})();