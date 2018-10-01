const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name:	String,
	userId: String,
	likedHobbies: [{}],
	dislikedHobbies: [{}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
