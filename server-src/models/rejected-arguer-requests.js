const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
  boardId : {
    ref : 'Board',
    type : Schema.Types.ObjectId
  },
  userId : [
    {
      ref : 'User',
      type : Schema.Types.ObjectId
    }
  ]
});

schema.virtual('users', {
  ref : 'User',
  localField : 'userId',
  foreignField : '_id'
});

module.exports = Mongoose.model('RejectedArguerRequests', schema);