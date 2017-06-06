const Board = require('../models/board');
const { async, await } = require('asyncawait');
const baseService = require('./base-service')(Board);
const normalize = require('../../shared/utils/object-normalizer');

module.exports = (()=> {
  const modifyBoard = (board, currentUserId, currentUserBookmarkedBoardIds) => {
    const isCurrentUserDownvoted = board.downvotes[0].users.some(userId => userId === currentUserId);
    const isCurrentUserUpvoted = board.upvotes[0].users.some(userId => userId === currentUserId);
    const isBookmarkedByCurrentUser = currentUserBookmarkedBoardIds.some(boardId => boardId === board._id);

    return Object.assign(board, {
      isBelongToCurrentUser : board.creator._id === currentUserId,
      isCurrentUserUpvoted,
      isCurrentUserDownvoted,
      isBookmarkedByCurrentUser
    });
  }

  const modifyPaginationDocs = (boardDocs, currentUserId, currentUserBookmarkedBoardIds) => {
    return boardDocs.map((board) => modifyBoard(board, currentUserId, currentUserBookmarkedBoardIds));
  }
  
  const paginate = async((options, currentUserId = null, currentUserBookmarkedBoardIds = []) => {
    const data = normalize(await(Board.paginate(options.query, {
      page : options.page,
      populate : options.populate,
      sort : options.sort
    })));
    
    if(currentUserId === null) {
      return data;
    }
    
    const modifiedDocs = modifyPaginationDocs(data.docs, currentUserId, currentUserBookmarkedBoardIds);
    const modifiedData = Object.assign(data, { docs : modifiedDocs });

    return modifiedData;
  });
  
  const publish = async((query) => {
    const boardToBePublished = await(findOneAndUpdate(
      { _id : query.boardId, creator : query.userId }, 
      { published : true },
      false
    ));
    return boardToBePublished;
  });

  const unpublish = async((query) => {
    const boardToBeUnpublished = await(findOneAndUpdate(
      { _id : query.boardId, creator : query.userId }, 
      { published : false },
      false
    ));
    return boardToBeUnpublished;
  });
  
  const findById = async(({boardId, select}) => {
    return await(baseService.findOne({
      query : {
        _id : boardId
      },
      select : select
    }));
  });

  const addArguer = async((boardId, userIdToBeAdded) => {
    return await(baseService.findOneAndUpdate({
      query : {
        _id : boardId,
      },
      modification : {
        $push : {
          arguers : userIdToBeAdded
        }
      }
    }))
  });

  const findOneAndUpdate = async((query, data, upsert) => {
    const editedBoard = await(Board.findOneAndUpdate(query, data, { upsert : upsert }));
    if(!editedBoard) {
      throw new Error('Board not found');
    }
    return editedBoard;
  });

  const edit = async((boardId, data) => {
    const editedBoard = await(baseService.findOneAndUpdate({
      query : {
        _id : boardId
      },
      modification : data
    }));
    return editedBoard;
  });
  
  const deleteBoard = async((boardId) => {
    return await(baseService.findOneAndUpdate({
      query : {
        _id : boardId,
      },
      modification : {
        deleted : true
      }
    }));
  });

  return {
    create : baseService.create,
    paginate : paginate,
    publish : publish,
    unpublish : unpublish,
    findOne : baseService.findOne,
    findById : findById,
    addArguer : addArguer,
    delete : deleteBoard,
    edit : edit
  }
})();