function Relation() {
	this.toCardId = null;
	this.type = null;
}

Relation.prototype = {
	setToCardId : function(cardId) {
		this.toCardId = cardId;
		return this;
	},
	getToCardId : function() {
		return this.toCardId;
	},
	setType : function(type) {
		this.type = type;
		return this;
	},
	getType : function() {
		return this.type;
	}
}

module.exports = Relation;