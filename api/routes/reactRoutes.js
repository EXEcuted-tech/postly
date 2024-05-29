const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const { likePost, retrieveLikesByParams, countLikes, retrieveByTwoParams, softDeleteLike, updateLike, retrieveCountMonthlyLikes, retrieveTotalCount} = require('../controllers/reactController')

router.post('/create', likePost)
router.post('/relike',authenticateToken, updateLike)
router.get('/retrieve',authenticateToken, retrieveLikesByParams)
router.get('/retrieveparams',authenticateToken, retrieveByTwoParams)
router.get('/count',authenticateToken, countLikes)
router.get('/retrieve/monthly',authenticateToken, retrieveCountMonthlyLikes)
router.get('/retrieve/total',authenticateToken, retrieveTotalCount)
router.post('/delete',authenticateToken, softDeleteLike)


module.exports = router;