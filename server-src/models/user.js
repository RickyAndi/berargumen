const Mongoose = require('../mongoose');
const Schema = Mongoose.Schema;

const schema = new Schema({
  facebookId : String,
  name : String,
  profilePicUrl : String,
  gender : String,
  email : String,
  addedOn : { 
    type: Date, 
    default: Date.now 
  },
  numberOfBoards : {
    type : Number
  },
  numberOfCards : {
    type : Number
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

module.exports = Mongoose.model('User', schema);
