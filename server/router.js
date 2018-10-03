'use strict';
const Router = require('koa-router');

const router = new Router();

const hobbiesController = require('./controllers/hobbies.controller');
const appController = require('./controllers/app.controller');
const authenticationController = require('./controllers/authentication.controller');

router.get('/', appController.getIndex);
router.get('/discover', hobbiesController.getAllHobbies);
router.get('/favorites', hobbiesController.getFavHobbies);
router.post('/postHobby', hobbiesController.postHobby);
router.put('/discover/like', hobbiesController.likeHobby);
router.put('/discover/dislike', hobbiesController.dislikeHobby);
router.post('/signup', authenticationController.signup);
router.get('/signin', authenticationController.signin);

module.exports = router;
