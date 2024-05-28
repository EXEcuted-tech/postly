const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const {createPost,retrieveAll, retrieveByParams, deletePost, updatePost, retrieveByParamsPosts} = require('../controllers/postController')
const {createPostValidator,editValidator} = require('../validations/postValidator')

router.post('/create',authenticateToken,createPostValidator,createPost);
router.get('/retrieve_all',authenticateToken,retrieveAll);
router.get('/retrieve', authenticateToken, retrieveByParams);
router.delete('/delete', authenticateToken, deletePost)
router.post('/edit',authenticateToken, editValidator,updatePost)
router.get('/search',authenticateToken, retrieveByParamsPosts)

module.exports = router;

