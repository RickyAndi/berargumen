class User {
  constructor() {
    this.id = null;
    this.name = null;
    this.profilePictureUrl = null;
  }

  setId(id) {
    this.id = id;
    return this;
  }
  
  getId() {
    return this.id;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  getName() {
    return this.name;
  }
  
  setProfilePictureUrl(profilePictureUrl) {
    this.profilePictureUrl = profilePictureUrl;
    return this;
  }

  getProfilePictureUrl() {
    return this.profilePictureUrl;
  }
}

module.exports = User;
