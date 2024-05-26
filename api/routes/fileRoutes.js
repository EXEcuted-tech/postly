const express = require('express');
const router = express.Router();
const {authenticateToken}= require('../middleware/jwtAuth')
const { uploadFile, fetchFile, retrieveByParams } = require('../controllers/fileController');

const upload = require('./multer')

router.post('/upload', authenticateToken, upload.single('file'), uploadFile);
router.get('/retrieve',authenticateToken, retrieveByParams);
router.get('/fetch', authenticateToken,fetchFile);

module.exports = router;