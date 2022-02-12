const express = require("express");

const router = express.Router();

/** Validator */
const v = require("../../../validators/validator");

/** Controller */
const authController = require("../../controller/authController");

/** Api Response */
// This authentication is for Memers
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
