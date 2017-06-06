const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
  user : {
    type : Schema.Types.ObjectId, 
    ref : 'User' 
  },
  boards : [{
    type : Schema.Types.ObjectId, 
    ref : 'Board'
  }]
});

module.exports = Mongoose.model('Bookmarks', schema);