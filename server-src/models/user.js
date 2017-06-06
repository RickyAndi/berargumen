const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;
const { async, await } = require('asyncawait');

const schema = new Schema({
  facebookId : String,
  displayName : String,
  profilePicUrl : String,
  gender : String,
  email : String,
  shortDescription : String,
  longDescription : String,
  bookmarkedBoards : [{
    ref : 'Board',
    type : Schema.Types.ObjectId 
  }],
  addedOn : { 
    type: Date, 
    default: Date.now 
  }
}, {
  toJSON : {
    virtuals : true
  },
  toObject : {
    virtuals : true
  }
});

schema.virtual("numberOfCards").get(function() {
  if(this.cards == null) return 0;
  return this.cards.length;
});

schema.virtual("numberOfBoards").get(function() {
  if(this.boards == null) return 0;
  return this.boards.length;
});

schema.virtual('boards', {
  ref : 'Board',
  localField : '_id',
  foreignField : 'creatorId'
});

schema.virtual('cards', {
  ref : 'Card',
  localField : '_id',
  foreignField : 'creatorId'
});

module.exports = Mongoose.model('User', schema);
