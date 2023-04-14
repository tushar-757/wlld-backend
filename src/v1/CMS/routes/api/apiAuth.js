const express = require('express');
const authController = require("../../controller/authController");

const router = express.Router();

router.post('/admin-signup',authController.signUp);
router.post('/admin-login',authController.login);

module.exports = router;
