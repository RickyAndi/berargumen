const { async, await } = require('asyncawait');
const BoardArguers = require('../models/board-arguers');

module.exports = (() => {
  const create = async((boardId, boardCreatorId) => {
    const toBeCreatedBoardArguers = new BoardArguers({
      board : boardId,
      users : [
        boardCreatorId
      ]
    });
    const newBoardArguers = await(toBeCreatedBoardArguers.save());
    return newBoardArguers;
  });
  
  const addArguers = async((boardId, {userIdToBeAdded}) => {
    const boardArguersWithAddition = await(BoardArguers
      .findOneAndUpdate({ 
        board : boardId,
      }, {
        $push: { 
          "users": userIdToBeAdded
        }
      }));
    return boardArguersWithAddition;
  });

  return {
    create : create,
    addArguers : addArguers
  }
})();