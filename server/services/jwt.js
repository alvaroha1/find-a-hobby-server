const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

// const secret = process.env.JWT_SECRET;
const secret = 'secret';


const createToken = () => jwt.sign({
  user: 'user',
  email: 'user@user.com',
  uuid: uuid()
}, secret);

module.exports = async (ctx, next) => {
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
