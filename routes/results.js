const express = require('express');
const router = express.Router();

const Result = require('../controllers/results');

router.get('/results', Result.getResults);
router.post('/results', Result.postResults);
router.get('/members', Result.viewMembers);
router.post('/members', Result.searchMembers);
module.exports = router;