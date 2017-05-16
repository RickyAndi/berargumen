const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
  userId : {
    type : Schema.Types.ObjectId, 
    ref : 'User' 
  },
  boardIds : [{
    type : Schema.Types.ObjectId, 
    ref : 'Board'
  }]
});

schema.virtual('bookmarkedBoards', {
  ref : 'Board',
  localField : 'boardIds',
  foreignField : '_id'
});

module.exports = Mongoose.model('Bookmarks', schema);