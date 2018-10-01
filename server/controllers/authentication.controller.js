
const signup = (ctx, next) => {
  const email = ctx.response.body.email;
  const password = ctx.response.body.password;
  // console.log(ctx.headers);
  if(!email || !password) {
    return ctx.status = 200;
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if(err) { return next(err); }

    if(existingUser) {
      ctx.status = 400;
      ctx.body = {
        errors:[
          'Username already exists.'
        ]
      };
    }
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if(err) { return next(err);}
      ctx.status = 200;
    });

  });
}

module.exports = {
  signup,
}


// const getIndex = (ctx, next) => {
//   ctx.body = 'this is the main view of Find a Hobby';
//   ctx.status = 200;
// }

// module.exports = {
//   signUp,
// }

// exports.getAll = async ctx => {
//   ctx.response.body = await message.getAll();
//   ctx.status = 200;
// };