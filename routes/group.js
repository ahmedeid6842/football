const express = require('express');
const router = express.Router();

const groupControllers = require('../controllers/group');
const logOut = require('../middleware/logout');

router.get('/group/:name', groupControllers.getGroup);
router.post('/group/:name', groupControllers.postGroup);
router.get('/logout', logOut.getlogOut)

module.exports = router;