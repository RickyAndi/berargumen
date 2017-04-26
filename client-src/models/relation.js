class Relation {
	constructor() {
		this.toCardId = null;
		this.type = null;
	}

	setToCardId(cardId) {
		this.toCardId = cardId;
		return this;
	}

	getToCardId() {
		return this.toCardId;
	}

	setType(type) {
		this.type = type;
		return this;
	}

	getType() {
		return this.type;
	}
}

module.exports = Relation;
