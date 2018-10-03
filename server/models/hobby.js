const mongoose = require('mongoose');

const hobbySchema = new mongoose.Schema({
  name: String,
  description: String,
  // links: [{}],
  tags: [{}],
  pictures: String,
});

const Hobby = mongoose.model('Hobby', hobbySchema);

module.exports = Hobby;
