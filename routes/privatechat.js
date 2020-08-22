const express = require('express');
const router = express.Router();
const privateChatControllers = require('../controllers/privatechat');

router.get('/chat/:name', privateChatControllers.getChatPage);
router.post('/chat/:name', privateChatControllers.postChatPage);
module.exports = router;