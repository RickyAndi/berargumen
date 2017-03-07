function Board() {
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
}

Board.prototype = {
	setId : function(id) {
		this.id = id;
		return this;
	},
	getId : function() {
		return this.id;
	},
	setTitle : function(title) {
		this.title = title;
		return this;
	},
	getTitle : function() {
		return this.title;
	},
	setDescription : function(description) {
		this.description = description;
		return this;
	},
	getDescription : function() {
		return this.description;
	},
	setUser : function(user) {
		this.user = user;
		return this;
	},
	getUser : function() {
		return this.user;
	},
	setCollaborators : function(collaborators) {
		this.collaborators = collaborators;
		return this;
	},
	getCollaborators : function() {
		return this.collaborators;
	},
	getCountOfCollaborators : function() {
		return this.getCollaborators().length;
	},
	setCountOfReason : function(countOfReason) {
		this.countOfReason = countOfReason;
		return this;
	},
	getCountOfReason : function() {
		return this.countOfReason;
	},
	setCountOfObjection: function(countOfObjection) {
		this.countOfObjection = countOfObjection;
		return this;
	},
	getCountOfObjection : function() {
		return this.countOfObjection;
	},
	setCountOfRebuttal : function(countOfRebuttal) {
		this.countOfRebuttal = countOfRebuttal;
		return this;
	},
	getCountOfRebuttal : function() {
		return this.countOfRebuttal;
	},
	getUserName : function() {
		if(this.isUserNull()) {
			return '';
		}

		return this.getUser().getName();
	},
	getUserProfilePictureUrl : function() {
		if(this.isUserNull()) {
			return '';
		}

		return this.getUser().getProfilePictureUrl();
	},
	isUserNull : function() {
		return this.getUser() == null;
	},
	setTags : function(tags) {
		this.tags = tags;
		return this;
	},
	getTags : function() {
		return this.tags;
	},
	setTopic : function(topic) {
		this.topic = topic;
		return this;
	},
	getTopic : function() {
		return this.topic;
	}
}

module.exports = Board;