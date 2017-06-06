const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
  creator : {
    type : Schema.Types.ObjectId, 
    ref : 'User' 
  },
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
  board : { 
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

schema.virtual('relatedCard', {
  ref : 'Card',
  localField : 'related.toId',
  foreignField : '_id'
});

module.exports = Mongoose.model('Card', schema);
