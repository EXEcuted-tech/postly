const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const {retrieveByParams, updateUser, retrieveByParamsLike, retrieveAll} = require('../controllers/userController')
const {editUserValidator, searchLikeUserValidator} = require('../validations/userValidator')

router.post('/edit',authenticateToken,editUserValidator,updateUser)
router.get('/retrieve',authenticateToken,retrieveByParams)
router.get('/search',authenticateToken,searchLikeUserValidator, retrieveByParamsLike)
router.get('getall',retrieveAll)

 
module.exports = router;