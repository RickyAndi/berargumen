function Card() {
	this.id = null;
	this.type = null;
	this.content = null;
	this.creator = null;
	this.top = null;
	this.left = null;
	this.creator = null;
	this.relation = null;
}

Card.prototype = {
	setId : function(id) {
		this.id = id;
		return this;
	},
	getId : function() {
		return this.id;
	},
	setContent : function(content) {
		this.content = content;
		return this;
	},
	getContent : function() {
		return this.content;
	},
	setType : function(type) {
		this.type = type;
		return this;
	},
	getType : function() {
		return this.type;
	},
	setTop : function(top) {
		this.top = top;
		return this;
	},
	getTop : function() {
		return this.top;
	},
	setLeft : function(left) {
		this.left = left
		return this;
	},
	getLeft : function() {
		return this.left;
	},
	setCreator : function(user) {
		this.creator = user;
		return this;
	},
	getCreator : function() {
		return this.creator;
	},
	getCreatorName : function() {
		if(this.isCreatorNull()) {
			return '';
		}
		return this.getCreator().getName();
	},
	isCreatorNull : function() {
		return this.getCreator() == null;
	},
	isUserCreator : function(user) {
		return this.creator.getId() == user.getId();
	},
	isRelationNull : function() {
		return this.getRelation() == null;
	},
	getRelation : function() {
		return this.relation;
	},
	setRelation : function(relation) {
		this.relation = relation;
		return this;
	},
	getRelatedToCardId : function() {
		if(this.isRelationNull()) {
			return null;
		}

		return this.getRelation().getToCardId();
	},
	getRelationType : function() {
		if(this.isRelationNull()) {
			return null;
		}
		
		return this.getRelation().getType();
	}
}

module.exports = Card;