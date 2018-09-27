

const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost/find-a-hobby';
// for local
module.exports = mongoose.connect(dbURL, console.log(`Mongoose connected to ${dbURL}`));

// for heroku
// module.exports = mongoose.connect(process.env.MONGODB_URI, console.log('mongoose connected'));
