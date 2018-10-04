const User = require('../models/user');
const bcrypt = require('bcrypt');
const btoa = require('atob');
const jwt = require('jsonwebtoken');

const secret = 'secret';




const signup = async (ctx, next) => {
  const {
    name,
    username,
    confirmPassword,
    email,
  } = ctx.request.body;
  let { password } = ctx.request.body;

  const user = await User.findOne({ username }) || await User.findOne({ email });
  console.log(user);
  if (user) {
    ctx.status = 409;
    ctx.body = JSON.stringify({ error: 'User already exist' });
  } else if (password !== confirmPassword) {
    ctx.status = 400;
    ctx.body = JSON.stringify({ error: 'Passwords do not match' });
  } else if (!user) {
    password = await bcrypt.hash(password, 10);
    User.create({
      name,
      username,
      password,
      confirmPassword,
      email,
    });
    ctx.status = 200;
    ctx.body = JSON.stringify({ response: 'User created' });
  } else {
    ctx.status = 500;
    ctx.body = JSON.stringify({ error: 'Unknown error' });
  }
};


const signin = async (ctx, next) => {
  const basic = ctx.headers.authorization.split(' ');
  if (basic.length < 2 && basic[0]!=='Basic') {
    throw new Error('Missing basic authentication header');
  }
  const [username, password] = btoa(basic[1]).split(':');
  const user = await User.findOne({username});
  const match = await bcrypt.compare(password, user.password);
  if (match) {

    const userData = {
      username: user.username,
      email: user.email,
      name: user.name,
      likedHobbies: user.likedHobbies,
      profile_picture: user.image,
    }
    const token = jwt.sign(userData, secret);

    ctx.status = 200;
    // console.log(createToken)
    ctx.body = { success: 'User authorized', token, userData };
  } else {
    ctx.status = 500;
  }
};


const dashboard = async (ctx, next) => {
  const token = ctx.headers.authorization.split(' ')[1];

  const userInfo = jwt.verify(token, secret);

  const user = await User.findOne({ username: userInfo.username });

  const userData = {
    username: user.username,
    email: user.email,
    name: user.name,
    likedHobbies: user.likedHobbies,
    profile_picture: user.image,
  };
  ctx.status = 200;
  ctx.body = { success: 'User authorized', token, userData };
};

module.exports = {
  signup,
  signin,
  dashboard,
};
