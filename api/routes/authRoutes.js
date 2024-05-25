const express = require('express');
const router = express.Router();

const {loginValidator} = require('../validations/authValidator')
const {login,logout,refreshExistingToken} = require('../controllers/authController')

router.post('/login', loginValidator, login);
router.post('/logout', logout);
router.post('/token', refreshExistingToken);

module.exports = router;