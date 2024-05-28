const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const {retrieveByParams, updateUser} = require('../controllers/userController')
const {editUserValidator} = require('../validations/userValidator')

// Public Routes
router.post('/edit/public', editUserValidator, updateUser);
router.get('/retrieve/public', retrieveByParams);

// Protected Routes
router.post('/edit',authenticateToken,editUserValidator,updateUser)
router.get('/retrieve',authenticateToken,retrieveByParams)
 
module.exports = router;