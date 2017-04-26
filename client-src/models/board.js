class Board {
  constructor() {
    this.id = null;
    this.title = null;
    this.description = null;
    this.user = null;
    this.countOfReason = null;
    this.countOfObjection = null;
    this.countOfRebuttal = null;
    this.collaborators = [];
    this.tags = [];
    this.topic = null;
    this.downvote = null;
    this.upvote = null;
    this.isCurrentUserUpvoted = false;
    this.isCurrentUserDownvoted = false;
    this.isBelongToCurrentUser = false;
    this.isPublished = false;
  }

  setId (id) {
    this.id = id;
    return this;
  }

  getId () {
    return this.id;
  }

  setTitle (title) {
    this.title = title;
    return this;
  }

  getTitle () {
    return this.title;
  }

  setDescription (description) {
    this.description = description;
    return this;
  }

  getDescription () {
    return this.description;
  }

  getExcerptDescription () {
    return this.getDescription().substring(0, 300);
  }

  isDescriptionTooLong () {
    return this.getDescription().length > 300;
  }

  setUser (user) {
    this.user = user;
    return this;
  }

  getUser () {
    return this.user;
  }

  setCollaborators (collaborators) {
    this.collaborators = collaborators;
    return this;
  }

  getCollaborators () {
    return this.collaborators;
  }

  getCountOfCollaborators() {
    return this.getCollaborators().length;
  }

  setCountOfReason(countOfReason) {
    this.countOfReason = countOfReason;
    return this;
  }

  getCountOfReason () {
    return this.countOfReason;
  }

  setCountOfObjection (countOfObjection) {
    this.countOfObjection = countOfObjection;
    return this;
  }

  getCountOfObjection () {
    return this.countOfObjection;
  }

  setCountOfRebuttal (countOfRebuttal) {
    this.countOfRebuttal = countOfRebuttal;
    return this;
  }

  getCountOfRebuttal () {
    return this.countOfRebuttal;
  }

  getUserName () {
    if(this.isUserNull()) {
      return '';
    }

    return this.getUser().getName();
  }

  getUserProfilePictureUrl () {
    if(this.isUserNull()) {
      return '';
    }

    return this.getUser().getProfilePictureUrl();
  }

  isUserNull () {
    return this.getUser() == null;
  }

  setTags (tags) {
    this.tags = tags;
    return this;
  }

  getTags () {
    return this.tags;
  }

  setTopic (topic) {
    this.topic = topic;
    return this;
  }

  getTopic () {
    return this.topic;
  }

  getDownvote () {
    return this.downvote;
  }

  setDownvote (downvote) {
    this.downvote = downvote;
    return this;
  }

  setUpvote (upvote) {
    this.upvote = upvote;
    return this;
  }

  getUpvote () {
    return this.upvote;
  }

  setIsCurrentUserDownvoted (isCurrentUserDownvoted) {
    this.isCurrentUserDownvoted = isCurrentUserDownvoted;
    return this;
  }

  currentUserDownvoted () {
    return this.isCurrentUserDownvoted;
  }

  setIsCurrentUserUpvoted (isCurrentUserUpvoted) {
    this.isCurrentUserUpvoted = isCurrentUserUpvoted;
    return this;
  }

  currentUserUpvoted () {
    return this.isCurrentUserUpvoted;
  }

  setIsBelongToCurrentUser (belongToCurrentUser) {
    this.isBelongToCurrentUser = belongToCurrentUser;
    return this;
  }

  belongsToCurrentUser () {
    return this.isBelongToCurrentUser;
  }

  setIsPublished (isPublished) {
    this.isPublished = isPublished;
    return this;
  }

  published () {
    return this.isPublished;
  }
};

module.exports = Board;
