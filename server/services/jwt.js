const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const User = require('../models/user');

// const secret = process.env.JWT_SECRET;
const secret = 'secret';


module.exports = async (ctx, next) => {
  const userData = await User.find({  username: 'user' });
  console.log(userData)

  const createToken = () => jwt.sign({
    username: userData.username,
    email: userData.email,
    name: userData.name,
    likedHobbies: userData.likedHobbies,
    profile_picture: userData.image,
  }, secret);

  let payload;

  try {
    token = ctx.headers.authorization.split('Bearer ')[1];
    jwt.verify(payload, secret);
  } catch(e) {
    token = createToken();
  }

  // set the token in the headers:
  ctx.set('X-Token', token);
  // in order to acces the token from the client:
  ctx.set('Access-Control-Expose-Headers', 'X-Token');

  // set also token as property in the ctx
  ctx.token = token;

  await next();


}
