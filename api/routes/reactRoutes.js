const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const { likePost, retrieveLikesByParams, countLikes, retrieveByTwoParams, softDeleteLike, updateLike} = require('../controllers/reactController')

router.post('/create',authenticateToken, likePost)
router.post('/relike',authenticateToken, updateLike)
router.get('/retrieve',authenticateToken, retrieveLikesByParams)
router.get('/count',authenticateToken, countLikes)
router.get('/retrieveparams',authenticateToken, retrieveByTwoParams)
router.post('/delete',authenticateToken, softDeleteLike)


module.exports = router;