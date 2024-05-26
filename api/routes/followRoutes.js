const express = require('express');
const router = express.Router();

const {authenticateToken}= require('../middleware/jwtAuth')

// router.post('/create',authenticateToken,createPostValidator,createPost);
// router.get('/retrieve',authenticateToken,retrieveAll);
// router.get('/retrieve_all',authenticateToken,retrieveAll);
// router.get('/delete',authenticateToken,retrieveAll);