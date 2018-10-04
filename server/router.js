'use strict';
const Router = require('koa-router');

const router = new Router();

const hobbiesController = require('./controllers/hobbies.controller');
const authenticationController = require('./controllers/authentication.controller');
const authentication = require('./middleware/authentication');

// router.get('/', authentication, appController.getIndex);
router.get('/discover', authentication, hobbiesController.getAllHobbies);
router.get('/favorites', authentication, hobbiesController.getFavHobbies);
router.post('/postHobby', authentication, hobbiesController.postHobby);
router.put('/discover/like', authentication, hobbiesController.likeHobby);
router.put('/discover/dislike', authentication, hobbiesController.dislikeHobby);
router.post('/signup', authenticationController.signup);
router.get('/signin', authenticationController.signin);
router.get('/', authentication, authenticationController.dashboard);

module.exports = router;
