const { async, await } = require('asyncawait');
const RejectedArguerRequests = require('../models/rejected-arguer-requests');

module.exports = (() => {
  const create = async((boardId) => {
    const toBeCreatedRejectedArguerRequests = new RejectedArguerRequests({
      board : boardId,
      users : []
    });
    const newRejectedArguerRequests = await(toBeCreatedRejectedArguerRequests.save());
    return newRejectedArguerRequests;
  });
  
  const addRejectedRequest = async((boardId, userIdToBeAdded) => {
    const rejectedArguersRequestsWithAddition = await(BoardArguers
      .findOneAndUpdate({ 
        board : boardId,
      }, {
        $push: { 
          "users": userIdToBeAdded
        }
      }));
    return rejectedArguersRequestsWithAddition;
  });

  return {
    create : create,
    addRejectedRequest : addRejectedRequest
  }
})();