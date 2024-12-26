const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/users', userController.getUsers);
router.put('/users/:id', userController.updateUser);
router.post('/users/2fa', userController.createNewFactor);

module.exports = router;
