const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const {createPost,retrieveAll, retrieveByParams, deletePost, updatePost} = require('../controllers/postController')
const {createPostValidator} = require('../validations/postValidator')

router.post('/create',authenticateToken,createPostValidator,createPost);
router.get('/retrieve_all',authenticateToken,retrieveAll);
router.get('/retrieve', authenticateToken, retrieveByParams);
router.delete('/delete', authenticateToken, deletePost)
router.put('/edit',authenticateToken, updatePost)

module.exports = router;

