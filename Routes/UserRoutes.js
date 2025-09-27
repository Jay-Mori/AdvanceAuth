const express = require('express');
const router = express.Router();
// const {use} =  require('react');
const userController = require('../Controller/UserController');

router.get('/test' , userController.test);
router.post('/register', userController.register);
router.post("/verify-otp", userController.verifyOTP);

module.exports = router;