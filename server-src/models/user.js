const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;

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
  return new Promise(function(resolve, reject) {
    self.findOne({ email : profile.emails[0].value })
      .then(function(user) {
        if(!user) {
          
          const user = new self({
            email : profile.emails[0].value,
            displayName : profile.displayName,
            photoUrl : profile.photos[0].value
          });

          user.save()
            .then(function(newUser) {
              resolve(newUser);
            })
            .catch(function(error) {
              reject(error);
            })
        }

        resolve(user);
      })
      .catch(function(error) {
        reject(error)
      })
  })
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
