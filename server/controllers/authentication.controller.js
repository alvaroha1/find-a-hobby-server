const User = require('../models/user');

const signup = async (ctx, next) => {

  const {
    name,
    username,
    password,
    confirmPassword,
    email,
  } = ctx.request.body;

  const user = await User.findOne({ username }) || await User.findOne({ email });
  console.log(user);
  if (user) {
    ctx.status = 409;
    ctx.body = JSON.stringify({ error: 'User already exist' });
  } else if (password !== confirmPassword) {
    ctx.status = 400;
    ctx.body = JSON.stringify({ error: 'Passwords do not match' });
  } else if (!user) {
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

module.exports = {
  signup,
};
