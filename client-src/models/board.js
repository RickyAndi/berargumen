class Board {
  constructor() {
    this.id = null;
    this.title = null;
    this.description = null;
    this.user = null;
    this.countOfReason = null;
    this.countOfObjection = null;
    this.countOfRebuttal = null;
    this.arguers = [];
    this.tags = [];
    this.downvote = null;
    this.upvote = null;
    this.isCurrentUserUpvoted = false;
    this.isCurrentUserDownvoted = false;
    this.isBelongToCurrentUser = false;
    this.isBookmarkedByCurrentUser = false;
    this.isPublished = false;
    this.slug = null;
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

  setArguers (arguers) {
    this.arguers = arguers;
    return this;
  }

  getArguers () {
    return this.arguers;
  }

  getCountOfArguers() {
    return this.getArguers().length;
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

  setSlug(slug) {
    this.slug = slug;
    return this;
  }

  getSlug() {
    return this.slug;
  }

  currentUserDoUpvote() {
    this.setIsCurrentUserUpvoted(true);
    const upvoteCount = this.getUpvote();
    const nextUpvoteCount = upvoteCount + 1;
    this.setUpvote(nextUpvoteCount);

    if(this.currentUserDownvoted()) {
      this.setIsCurrentUserDownvoted(false);
      const downvoteCount = this.getDownvote();
      const nextDownvoteCount = downvoteCount - 1;
      this.setDownvote(nextDownvoteCount);
    }
  }

  currentUserDoDownvote() {
    this.setIsCurrentUserDownvoted(true);
    const downvoteCount = this.getDownvote();
    const nextDownvoteCount = downvoteCount + 1;
    this.setDownvote(nextDownvoteCount);

    if(this.currentUserUpvoted()) {
      this.setIsCurrentUserUpvoted(false);
      const upvoteCount = this.getUpvote();
      const nextUpvoteCount = upvoteCount - 1;
      this.setUpvote(nextUpvoteCount);
    }
  }

  currentUserDoRemoveUpvote() {
    this.setIsCurrentUserUpvoted(false);
    const upvoteCount = this.getUpvote();
    const nextUpvoteCount = upvoteCount - 1;
    this.setUpvote(nextUpvoteCount);
  }

  currentUserDoRemoveDownvote() {
    this.setIsCurrentUserDownvoted(false);
    const downvoteCount = this.getDownvote();
    const nextDownvoteCount = downvoteCount - 1;
    this.setDownvote(nextDownvoteCount);
  }

  bookmarkedByCurrentUser() {
    return this.isBookmarkedByCurrentUser;
  }

  setIsCurrentUserBookmarked(bool) {
    this.isBookmarkedByCurrentUser = bool;
    return this;
  }
};

module.exports = Board;
