const express = require('express');
const { sendEmail, validateOTP } = require('../controllers/forgotpassController');
const router = express.Router();

router.post('/sendEmail', sendEmail)
router.post('/verifycode', validateOTP)

module.exports = router;