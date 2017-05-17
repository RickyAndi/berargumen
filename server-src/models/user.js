const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;
const { async, await } = require('asyncawait');

const schema = new Schema({
  facebookId : String,
  displayName : String,
  profilePicUrl : String,
  gender : String,
  email : String,
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

schema.statics.findOrCreateFacebook = function findOrCreate(profile) {
  const self = this;
  return new Promise(async(function(resolve, reject) {
    try {
      const user = await(self.findOne({ email : profile.emails[0].value }));
      
      if(!user) {
        const toBeCreatedUser = new self({
          email : profile.emails[0].value,
          displayName : profile.displayName,
          profilePicUrl : profile.photos[0].value
        });
        
        const newUser = await(toBeCreatedUser.save());

        return resolve(newUser);
      }

      return resolve(user);
    } catch(error) {
      console.log(error)
      return reject(error);
    }
  }));
};

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
