const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const {createPost} = require('../controllers/postController')
const {createPostValidator} = require('../validations/postValidator')

router.post('/create',authenticateToken,createPostValidator,createPost);

module.exports = router;