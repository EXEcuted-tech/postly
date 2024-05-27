const express = require('express');
const { authenticateToken } = require('../middleware/jwtAuth');
const router = express.Router();
const {getAllNotifications} = require('../controllers/notifController')

router.get('/', authenticateToken, getAllNotifications)

module.exports = router;