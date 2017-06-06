const { async, await } = require('asyncawait');
const User = require('../models/user');
const baseService = require('./base-service')(User);

module.exports = (() => {
  const findOrCreateFacebook = async((profile) => {
    const user = await(baseService.findOne({
      query : { 
        email : profile.emails[0].value 
      },
      select : null
    }));
    if(user) {
      return user;
    }

    const userDataToBeCreated = {
      email : profile.emails[0].value,
      displayName : profile.displayName,
      profilePicUrl : profile.photos[0].value
    };
    return await(baseService.create(userDataToBeCreated));
  });
  
  const addBookmarkedBoard = async((userId, boardId) => {
    return await(baseService.findOneAndUpdate({
      query : {
        _id : userId
      },
      modification : {
        $push : {
          "bookmarkedBoards": boardId
        }
      }
    }));
  });

  const removeBookmarkedBoard = async((userId, boardId) => {
    return await(baseService.findOneAndUpdate({
      query : {
        _id : userId
      },
      modification : {
        $pull : {
          "bookmarkedBoards": boardId
        }
      }
    }));
  });

  return {
    findOrCreateFacebook : findOrCreateFacebook,
    findOne : baseService.findOne,
    create : baseService.create,
    addBookmarkedBoard : addBookmarkedBoard,
    findById : baseService.findById,
    removeBookmarkedBoard : removeBookmarkedBoard
  }
})();