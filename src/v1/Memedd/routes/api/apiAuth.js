const express = require("express");
const checkAuth = require("../../../../middleware/checkAuth");

const router = express.Router();

/** Validator */
const v = require("../../../validators/validator");

/** Controller */
const authController = require("../../controller/authController");

/** Api Response */
// This authentication is for Brand users
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
