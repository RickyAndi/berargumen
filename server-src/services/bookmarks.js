const { async, await } = require('asyncawait');
const Bookmarks = require('../models/bookmarks');

module.exports = (() => {
  const create = async((userId) => {
    const toBeCreatedBookmarks = new Bookmarks({
      user : userId,
      boards : []
    });
    const newBookmarks = await(toBeCreatedBookmarks.save());
    return newBookmarks;
  });
  
  const addBookmarks = async((userId, boardIdToBeAdded) => {
    const bookmarksWithAddition = await(Bookmarks
      .findOneAndUpdate({ 
        user : userId,
      }, {
        $push: { 
          "users": boardIdToBeAdded
        }
      }));
    return bookmarksWithAddition;
  });

  return {
    create : create,
    addBookmarks : addBookmarks
  }
})();