const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
  board : {
    ref : 'Board',
    type : Schema.Types.ObjectId
  },
  users : [{
    ref : 'User',
    type : Schema.Types.ObjectId
  }]
});

module.exports = Mongoose.model('Downvote', schema);