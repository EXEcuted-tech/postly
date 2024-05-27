const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const {retrieveByParams, updateUser} = require('../controllers/userController')
const {editUserValidator} = require('../validations/userValidator')

router.post('/edit',authenticateToken,editUserValidator,updateUser)
router.get('/retrieve',authenticateToken,retrieveByParams)
 
module.exports = router;