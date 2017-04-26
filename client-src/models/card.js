class Card {
  constructor() {
    this.id = null;
    this.type = null;
    this.content = null;
    this.creator = null;
    this.top = null;
    this.left = null;
    this.creator = null;
    this.relation = null;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  getId() {
    return this.id;
  }
  
  setContent(content) {
    this.content = content;
    return this;
  }

  getContent() {
    return this.content;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  getType() {
    return this.type;
  }

  setTop(top) {
    this.top = top;
    return this;
  }

  getTop() {
    return this.top;
  }

  setLeft(left) {
    this.left = left
    return this;
  }

  getLeft() {
    return this.left;
  }

  setCreator(user) {
    this.creator = user;
    return this;
  }

  getCreator() {
    return this.creator;
  }

  getCreatorName() {
    if(this.isCreatorNull()) {
      return '';
    }
    return this.getCreator().getName();
  }

  isCreatorNull() {
    return this.getCreator() == null;
  }

  isUserCreator(user) {
    return this.creator.getId() == user.getId();
  }

  isRelationNull() {
    return this.getRelation() == null;
  }

  getRelation() {
    return this.relation;
  }

  setRelation(relation) {
    this.relation = relation;
    return this;
  }

  getRelatedToCardId() {
    if(this.isRelationNull()) {
      return null;
    }

    return this.getRelation().getToCardId();
  }

  getRelationType() {
    if(this.isRelationNull()) {
      return null;
    }
    
    return this.getRelation().getType();
  }
}

module.exports = Card;
