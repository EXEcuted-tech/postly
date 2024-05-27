const express = require('express');
const router = express.Router();

const {loginValidator, signupValidator} = require('../validations/authValidator')
const {login,logout,refreshExistingToken, signup } = require('../controllers/authController')

router.post('/login', loginValidator, login);
router.post('/logout', logout);
router.post('/token', refreshExistingToken);

router.post('/signup', signupValidator, signup);

module.exports = router;