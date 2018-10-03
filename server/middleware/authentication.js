const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const secret = process.env.JWT_SECRET;
const secret = 'secret';


module.exports = async (ctx, next) => {
  const token = ctx.headers.authorization.split(' ')[1];

  const userData = jwt.verify(token, secret);

  const user = await User.findOne({ username: userData.username });

  if (!user) {
    ctx.status = 401;
    return;
  }
  console.log('authenticated')
  await next();
};
