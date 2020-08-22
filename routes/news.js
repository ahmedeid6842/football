const express = require('express');
const router = express.Router();

const newControllers = require('../controllers/new');

router.get('/latest-football-news', newControllers.getNews);

module.exports = router;