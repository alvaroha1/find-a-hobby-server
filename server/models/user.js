const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  user: String,
	name:	String,
	userId: String,
	likedHobbies: [{}],
	dislikedHobbies: [{}]
});

// userSchema.pre('save', function(next) {
//   const user = this;
//   bcrypt.genSalt(10, function(err, salt) {
//     if(err) { return next(err); }
//
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       user.password = hash;
//       next();
//     });
//   });
// });

const User = mongoose.model('user', userSchema);

module.exports = User;
