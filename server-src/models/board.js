const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const schema = new Schema({
  creatorId : {
    type : Schema.Types.ObjectId, 
    ref : 'User' 
  },
  title : String,
  description : String,
  updated : { 
    type: Date, 
    default: Date.now 
  },
  tags : [String],
  collaborators : [
    {
      userId : { 
        type : Schema.Types.ObjectId, 
        ref : 'User' 
      },
      name : String,
      profilePic : String 
    }
  ],
  collaboratorsRequest : [
    {
      userId : { 
        type : Schema.Types.ObjectId, 
        ref : 'User' 
      },
      name : String,
      profilePic : String 
    }
  ],
  rejectedCollaboratorsRequest : [
    {
      userId : { 
        type : Schema.Types.ObjectId, 
        ref : 'User' 
      },
      name : String,
      profilePic : String 
    }
  ],
  bookmarkedBy : [{
    type : Schema.Types.ObjectId, 
    ref : 'User'
  }],
  topic : String,
  published : Boolean
});

schema.virtual("countOfObjection").get(() => {
  const objectionCards = this.cards.filter(card => card.type == 'objection');
  return objectionCards.length;
});

schema.virtual('countOfReason').get(() => {
  const reasonCards = this.cards.filter(card => card.type == 'reason');
  return reasonCards.length;
});

schema.virtual("countOfRebuttal").get(() => {
  const rebuttalCards = this.cards.filter(card => card.type == 'rebuttal');
  return rebuttalCards.length;
});

schema.virtual('cards', {
  ref : 'Card',
  localField : '_id',
  foreignField : 'board'
});

schema.index({ 
  title : 'text', 
  description : 'text', 
  tags : 'text'
});

boardSchema.plugin(mongoosePaginate);

module.exports = Mongoose.model('Board', schema);
