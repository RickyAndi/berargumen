const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const slug = require('mongoose-slug-generator');

const schema = new Schema({
  creator: {
    type: Schema.ObjectId, 
    ref: 'User' 
  },
  title: String,
  description: String,
  updated: { 
    type: Date, 
    default: Date.now 
  },
  tags: [String],
  published: Boolean,
  slug: { 
    type: String, 
    slug: "title",
    unique: true
  },
  arguers : [{
    type : Schema.ObjectId, 
    ref : 'User' 
  }],
  deleted : {
    type : Boolean,
    default: false
  }
}, {
  toJSON : {
    virtuals : true
  },
  toObject : {
    virtuals : true
  }
});

schema.virtual("countOfObjection").get(function() {
  if(this.cards === null) {
    return 0;
  }
  
  const objectionCards = this.cards.filter(card => card.type == 'objection');
  return objectionCards.length;
});

schema.virtual('countOfReason').get(function() {
  if(this.cards === null) {
    return 0;
  }

  const reasonCards = this.cards.filter(card => card.type == 'reason' || card.type == 'co-reason');
  return reasonCards.length;
});

schema.virtual("countOfRebuttal").get(function() {
  if(this.cards === null) {
    return 0;
  }

  const rebuttalCards = this.cards.filter(card => card.type == 'rebuttal');
  return rebuttalCards.length;
});

schema.virtual('countOfArguers').get(function() {
  if(this.arguers === null) {
    return 0;
  }

  return this.arguers.length;
});

schema.virtual('countOfUpvote').get(function() {
  if(this.upvotes === null) {
    return 0;
  }
  return this.upvotes[0].users.length
});

schema.virtual('countOfDownvote').get(function() {
  if(this.downvotes === null) {
    return 0;
  }
  return this.downvotes[0].users.length
});

schema.virtual('isBelongToCurrentUser').get(function() {
  return false;
});

schema.virtual('isBookmarkedByCurrentUser').get(function() {
  return false;
});

schema.virtual('cards', {
  ref : 'Card',
  localField : '_id',
  foreignField : 'board'
});

schema.virtual('arguerRequests', {
  ref : 'ArguerRequests',
  localField : '_id',
  foreignField : 'board'
});

schema.virtual('rejectedArguerRequests', {
  ref : 'RejectedArguerRequests',
  localField : '_id',
  foreignField : 'board'
});

schema.virtual('upvotes', {
  ref : 'Upvote',
  localField : '_id',
  foreignField : 'board'
});

schema.virtual('downvotes', {
  ref : 'Downvote',
  localField : '_id',
  foreignField : 'board'
});

schema.index({ 
  title : 'text', 
  description : 'text', 
  tags : 'text'
});

schema.plugin(slug);
schema.plugin(mongoosePaginate);

module.exports = Mongoose.model('Board', schema);
