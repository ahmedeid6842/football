const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin');
const multer = require('../middleware/multer');

router.get('/dashboard', adminControllers.getDashboard);
router.post('/uploadFile', multer, adminControllers.uploadimage);

router.post('/dashboard', multer, adminControllers.postClub);



module.exports = router;