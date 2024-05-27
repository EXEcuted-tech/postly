const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const {createFollowValidator} = require('../validations/followValidator');
const { createFollow,retrieveByParams, retrieveCountByParams,retrieveByTwoParams, retrieveCountMonthlyFollowers, softDeleteFollow, updateFollow, retrieveCountLostFollowers, retrieveCountGainedFollowers } = require('../controllers/followController');

router.post('/create',authenticateToken,createFollowValidator,createFollow);
router.post('/refollow',authenticateToken,updateFollow);
router.get('/retrieve',authenticateToken,retrieveByParams);
router.get('/retrieve/count',authenticateToken,retrieveCountByParams);
router.get('/retrieve/count_lost',authenticateToken,retrieveCountLostFollowers);
router.get('/retrieve/count_gained',authenticateToken,retrieveCountGainedFollowers);
router.get('/retrieve/monthly_followers',authenticateToken,retrieveCountMonthlyFollowers);
router.get('/retrieve_follow',authenticateToken,retrieveByTwoParams);
router.post('/delete',authenticateToken,softDeleteFollow);

module.exports=router