const express = require('express');
const router = express.Router();
const interestControllers = require('../controllers/interests');

router.get('/settings/interests',interestControllers.getInterest)
router.post('/settings/interests',interestControllers.postInterest)

module.exports = router;