const raccoon = require('../services/raccoon');
const jwt = require('jsonwebtoken');

const Hobby = require('../models/hobby');
const User = require('../models/user');

const getAllHobbies = async (ctx) => {
  let hobbies = await Hobby.find();
  const userId = ctx.token;
  if (!hobbies) {
    // eslint-disable-next-line
    console.log('no hobbies found');
    ctx.body = 'no hobbies found';
    ctx.status = 500;
    return;
  }
  const decoded = jwt.verify(userId, 'secret');

  let user = await User.findOne({ user: decoded.user });

  if (!user) {
    user = await User.create({ user: decoded.user, email: decoded.email });
  }

  // number of liked hobbies before starting recommendations
  if (user.likedHobbies.length > 2) {
    const recs = await raccoon.recommendFor(decoded.user, 10);
    hobbies = hobbies.filter(hobby => recs.includes(hobby._id));
  }

  hobbies = hobbies.filter(hobby => !user.likedHobbies.includes(String(hobby._id)));
  hobbies = hobbies.filter(hobby => !user.dislikedHobbies.includes(String(hobby._id)));

  ctx.body = hobbies;
};

const getFavHobbies = async (ctx) => {
  let hobbies = await Hobby.find();
  const userId = ctx.token;
  if (!hobbies) {
    // eslint-disable-next-line
    console.log('no hobbies found');
    ctx.body = 'no hobbies found';
    ctx.status = 500;
    return;
  }
  const decoded = jwt.verify(userId, 'secret');

  let user = await User.findOne({ user: decoded.user });

  if (user.length === 0) {
    // User.user = decoded.user
    user = await User.create({ user: decoded.user, email: decoded.email });
  }

  hobbies = hobbies.filter(hobby => user.likedHobbies.includes(String(hobby._id)));

  ctx.body = hobbies;
};

const postHobby = async (ctx) => {
  const hobbyData = ctx.request.body;
  // console.log(hobbyData);
  // TODO: Response is not arriving to client properly.

  try {
    let hobby = await Hobby.findOne({ name: hobbyData.name });
    // eslint-disable-next-line
    console.log('===', hobby);
    if (hobby) {
      ctx.status = 400;
      ctx.body = JSON.stringify({
        status: 'error',
        message: 'There is already a hobby with that name',
      });
    } else {
      // eslint-disable-next-line
      console.log('===new hobby');
      hobby = new Hobby({
        name: hobbyData.name,
        description: hobbyData.description,
        links: hobbyData.links,
        tags: hobbyData.tags,
        pictures: hobbyData.pictures,
      });
      const savedHobby = await hobby.save();
      if (savedHobby) {
        ctx.status = 201;
        ctx.body = JSON.stringify({
          status: 'success',
          data: savedHobby,
        });
      }
    }
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
};

const likeHobby = async (ctx) => {
  const userId = ctx.token;
  const hobbyId = ctx.request.body.hobbyId;

  const decoded = jwt.verify(userId, 'secret');
  let user = await User.find({ user: decoded.user });
  if (user.length) {
    user = await User.findOneAndUpdate(
      { user: decoded.user },
      {
        $addToSet: { likedHobbies: hobbyId },
      },
    );
  }

  raccoon.liked(decoded.user, hobbyId);

  ctx.body = { userId, hobbyId };
};

const dislikeHobby = async (ctx) => {
  const userId = ctx.token;
  const hobbyId = ctx.request.body.hobbyId;

  const decoded = jwt.verify(userId, 'secret');
  let user = await User.find({ user: decoded.user });
  if (user.length) {
    user = await User.findOneAndUpdate(
      { user: decoded.user },
      {
        $addToSet: { dislikedHobbies: hobbyId },
      },
    );
  }

  raccoon.disliked(decoded.user, hobbyId);

  ctx.body = { userId, hobbyId };
};

module.exports = {
  getAllHobbies,
  getFavHobbies,
  postHobby,
  likeHobby,
  dislikeHobby,
};
