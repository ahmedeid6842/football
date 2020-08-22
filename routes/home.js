const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/home');
const logOut = require('../middleware/logout');
router.get('/home', homeControllers.homePage);
router.post('/home', homeControllers.postHomePage);
router.get('/logout', logOut.getlogOut)
module.exports = router;