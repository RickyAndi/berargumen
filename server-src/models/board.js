const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const schema = new Schema({
  creator : {
    type : Schema.ObjectId, 
    ref : 'User' 
  },
  title : String,
  description : String,
  updated : { 
    type: Date, 
    default: Date.now 
  },
  tags : [String],
  topic : String,
  published : Boolean,
  slug : String
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
  return 0;
});

schema.virtual('countOfDownvote').get(function() {
  return 0;
});

schema.virtual('cards', {
  ref : 'Card',
  localField : '_id',
  foreignField : 'boardId'
});

schema.virtual('arguerRequests', {
  ref : 'ArguerRequests',
  localField : '_id',
  foreignField : 'boardId'
});

schema.virtual('rejectedArguerRequests', {
  ref : 'RejectedArguerRequests',
  localField : '_id',
  foreignField : 'boardId'
});

schema.virtual('arguers', {
  ref : 'BoardArguers',
  localField : '_id',
  foreignField : 'boardId'
});

schema.index({ 
  title : 'text', 
  description : 'text', 
  tags : 'text'
});

schema.plugin(mongoosePaginate);

module.exports = Mongoose.model('Board', schema);
