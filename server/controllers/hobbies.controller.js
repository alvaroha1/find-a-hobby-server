const raccoon = require('../services/raccoon');
const jwt = require('jsonwebtoken');

const Hobby = require('../models/hobby');
const User = require('../models/user');

const getAllHobbies = async (ctx, next) => {
  let hobbies = await Hobby.find();
  const userId = ctx.token;
  if (!hobbies) {
    console.log('no hobbies found');
    ctx.body = 'no hobbies found';
    ctx.status = 500;
    return;
  }
  const decoded = jwt.verify( userId, 'secret')

  let user = await User.findOne({ user: decoded.user })

  if (user.length === 0) {
    // User.user = decoded.user
    user = await User.create({ user: decoded.user, email: decoded.email })
  }

  hobbies = hobbies.filter(hobby => !user.likedHobbies.includes(String(hobby._id)));
  hobbies = hobbies.filter(hobby => !user.dislikedHobbies.includes(String(hobby._id)));

  console.log(hobbies)

  ctx.body = hobbies;
};

// const getRandomHobbie = async (ctx, next) => {
//   const hobbies = await Hobby.find();
//   ctx.body = hobbies[Math.floor(Math.random()*hobbies.length)];
// }

const getFavHobbies = async (ctx, next) => {
  let hobbies = await Hobby.find();
  const userId = ctx.token;
  if (!hobbies) {
    console.log('no hobbies found');
    ctx.body = 'no hobbies found';
    ctx.status = 500;
    return;
  }
  const decoded = jwt.verify( userId, 'secret')

  let user = await User.findOne({ user: decoded.user })

  if (user.length === 0) {
    // User.user = decoded.user
    user = await User.create({ user: decoded.user, email: decoded.email })
  }

  hobbies = hobbies.filter(hobby => user.likedHobbies.includes(String(hobby._id)));

  ctx.body = hobbies;
};

// const getSeenHobbies = async (ctx,next) => {
//   // const userId = ctx.request.body;
//   // // TODO: this
// }

const postHobby = async (ctx, next) => {
  const hobbyData = ctx.request.body;
  // console.log(hobbyData);
  // TODO: Response is not arriving to client properly.

  try {
    let hobby = await Hobby.findOne({ name: hobbyData.name });
    console.log('===', hobby);
    if (hobby) {
      ctx.status = 400;
      ctx.body = JSON.stringify({
        status: 'error',
        message: 'There is already a hobby with that name'
      });
    } else {
      console.log('===new hobby');
      hobby = new Hobby({
        name:	hobbyData.name,
        description: hobbyData.description,
        links: hobbyData.links,
        tags: hobbyData.tags,
        pictures: hobbyData.pictures,
      });
      const savedHobby = await hobby.save()
      if (savedHobby) {
        ctx.status = 201;
        ctx.body = JSON.stringify({
          status: 'success',
          data: savedHobby
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const likeHobby = async (ctx, next) => {
  const userId = ctx.token;
  const hobbyId = ctx.request.body.hobbyId;

  const decoded = jwt.verify(userId, 'secret')
  let user = await User.find({ user: decoded.user });
  if (user.length) {
    user = await User.findOneAndUpdate({ user: decoded.user }, { $addToSet: { likedHobbies: hobbyId } });
  }

  raccoon.liked(userId, hobbyId);

  ctx.body = { userId, hobbyId };
};

const dislikeHobby = async (ctx, next) => {
  const userId = ctx.token;
  const hobbyId = ctx.request.body.hobbyId;
  // console.log('--userId:', userId);
  // console.log('--hobbyId:', hobbyId);
  const decoded = jwt.verify(userId, 'secret')
  //
  let user = await User.find({ user: decoded.user });
  if (user.length) {
    user = await User.findOneAndUpdate(user, { $addToSet: { $each: { dislikedHobbies: hobbyId } } });
  } else {
    user = await User.create({ user, dislikedHobbies: [hobbyId] })
  }

  raccoon.disliked(userId, hobbyId);

  ctx.body = { userId, hobbyId };
};

module.exports = {
  getAllHobbies,
  getFavHobbies,
  // getRandomHobbie,
  // getRecHobbies,
  postHobby,
  likeHobby,
  dislikeHobby,
};
