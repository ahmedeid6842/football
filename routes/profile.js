const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin');
const multer = require('../middleware/multer');

const profileControllers = require('../controllers/profile');

router.get('/settings/profile', profileControllers.getProfile);
router.post('/userupload', multer, profileControllers.updateUserImg)
router.post('/settings/profile', profileControllers.postProfile);
router.get('/profile/:name',profileControllers.overViewPage)
router.post('/profile/:name',profileControllers.overViewPostPage)


module.exports = router; 