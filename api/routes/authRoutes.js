const express = require('express');
const router = express.Router();

const {loginValidator, signupValidator} = require('../validations/authValidator')
const {login,logout,refreshExistingToken, signup, sendEmail, validateOTP } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/jwtAuth');

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/logout', logout);
router.post('/token', refreshExistingToken);

module.exports = router;