const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
  creatorId : {
    type : Schema.Types.ObjectId, 
    ref : 'User' 
  },
  title : String,
  content : String,
  type : String,
  top : String,
  left : String,
  updated : { 
    type: Date, 
    default: Date.now 
  },
  related : {
    toId : { 
      type : Schema.Types.ObjectId, 
      ref : 'Card' 
    },
    type : {
      type : String
    }  
  },
  boardId : { 
    type : Schema.Types.ObjectId, 
    ref : 'Board' 
  },
  deleted : {
    type : Boolean,
    default : false
  }
}, {
  toJSON : {
    virtuals : true
  },
  toObject : {
    virtuals : true
  }
});

schema.virtual('board', {
  ref : 'Board',
  localField : 'boardId',
  foreignField : '_id'
});

schema.virtual('creator', {
  ref : 'User',
  localField : 'creatorId',
  foreignField : '_id'
});

schema.virtual('relatedCard', {
  ref : 'Card',
  localField : 'related.toId',
  foreignField : '_id'
});

module.exports = Mongoose.model('Card', schema);
