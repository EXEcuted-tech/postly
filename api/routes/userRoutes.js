const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')
const {retrieveByParams} = require('../controllers/userController')

router.get('/retrieve',authenticateToken,retrieveByParams)

module.exports = router;