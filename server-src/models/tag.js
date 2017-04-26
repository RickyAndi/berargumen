const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;

const tagSchema = new Schema({
  name : String,
  boardCount : {
    type : Number
  }
});

module.exports = Mongoose.model('Tag', tagSchema);
