const Board = require('../models/board');
const User = require('../models/user');

module.exports = (() => {
  function create(data) {
    const board = new Board();
    const user = new User();

    user
      .setName(data.creator.displayName)
      .setProfilePictureUrl(data.creator.profilePicUrl);
    
    const arguers = data.arguers.map((arguer) => {
      return (new User())
        .setName(arguer.displayName)
        .setProfilePictureUrl(arguer.profilePicUrl);
      
    });

    board
      .setId(data._id)
      .setTitle(data.title)
      .setDescription(data.description)
      .setUser(user)
      .setTags(data.tags)
      .setCountOfReason(data.countOfReason)
      .setCountOfObjection(data.countOfObjection)
      .setCountOfRebuttal(data.countOfRebuttal)
      .setIsCurrentUserUpvoted(data.isCurrentUserUpvoted)
      .setIsCurrentUserDownvoted(data.isCurrentUserDownvoted)
      .setIsBelongToCurrentUser(data.isBelongToCurrentUser)
      .setIsPublished(data.published)
      .setDownvote(data.countOfDownvote)
      .setUpvote(data.countOfUpvote)
      .setSlug(data.slug)
      .setIsCurrentUserBookmarked(data.isBookmarkedByCurrentUser)
      .setArguers(arguers);

    return board;
  }

  return {
    create : create
  }
})();
