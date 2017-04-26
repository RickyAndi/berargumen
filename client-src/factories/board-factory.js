const Board = require('../models/board');
const User = require('../models/user');

module.exports = (() => {
  function create(data) {
    const board = new Board();
    const user = new User();

    user
      .setName(data.user.name)
      .setProfilePictureUrl(data.user.profilePictureUrl);

    const collaborators = data.collaborators.map(collaborator => {
      const collaboratorInstance = new User();
      
      collaboratorInstance
        .setName(collaborator.name)
        .setProfilePictureUrl(collaborator.profilePictureUrl);

      return collaboratorInstance;
    })

    board
      .setId(data.id)
      .setTitle(data.title)
      .setDescription(data.description)
      .setTopic(data.topic)
      .setUser(user)
      .setTags(data.tags)
      .setCollaborators(collaborators)
      .setCountOfReason(data.countOfReason)
      .setCountOfObjection(data.countOfObjection)
      .setCountOfRebuttal(data.countOfRebuttal)
      .setIsCurrentUserUpvoted(data.isCurrentUserUpvoted)
      .setIsCurrentUserDownvoted(data.isCurrentUserDownvoted)
      .setIsBelongToCurrentUser(data.isBelongToCurrentUser)
      .setIsPublished(data.isPublished)
      .setDownvote(data.downvote)
      .setUpvote(data.upvote);
      
    return board;
  }

  return {
    create : create
  }
})();
