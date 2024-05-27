const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const {retrieveByParams, updateUser} = require('../controllers/userController')

router.post('/edit',authenticateToken,updateUser)
router.get('/retrieve',authenticateToken,retrieveByParams)
 
module.exports = router;