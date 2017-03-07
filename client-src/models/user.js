function User() {
	this.id = null;
	this.name = null;
	this.profilePictureUrl = null;
}

User.prototype = {
	setId : function(id) {
		this.id = id;
		return this;
	},
	getId : function() {
		return this.id;
	},
	setName : function(name) {
		this.name = name;
		return this;
	},
	getName : function() {
		return this.name;
	},
	setProfilePictureUrl : function(profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
		return this;
	},
	getProfilePictureUrl : function() {
		return this.profilePictureUrl;
	}
}

module.exports = User;