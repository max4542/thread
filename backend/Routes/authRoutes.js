const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');

// Register route
router.post('/login', AuthController.sendotp);

// Login route
router.post('/verify', AuthController.verifyotp);

module.exports = router;
