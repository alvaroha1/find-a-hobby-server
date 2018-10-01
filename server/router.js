'use strict';
const Router = require('koa-router');

const router = new Router();

const hobbiesController = require('./controllers/hobbies.controller');
const appController = require('./controllers/app.controller');
// const sessionController = require('./controllers/session.controller');
const authenticationController = require('./controllers/authentication.controller');

router.get('/', appController.getIndex);
router.get('/discover', hobbiesController.getAllHobbies);
router.get('/hobbies/seen', hobbiesController.getSeenHobbies);
router.get('/hobbies/random', hobbiesController.getRandomHobbie);
router.get('/hobbies/rec:user', hobbiesController.getRecHobbies);
router.post('/create', hobbiesController.postHobby);
router.put('/discover/like', hobbiesController.likeHobby);
router.put('/discover/dislike', hobbiesController.dislikeHobby);
router.post('/signup', authenticationController.signup);


// router.get('/sid', sessionController.getSessionId);

module.exports = router;
