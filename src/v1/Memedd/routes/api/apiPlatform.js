const express = require("express");

const router = express.Router();
const checkAuth = require("../../../../middleware/checkAuth");

/** Validator */
const v = require("../../../validators/validator");

/** Controller */
const platformController = require("../../controller/platformController");

/** Api Response */
router.get("/", checkAuth, platformController.getPlatformFormats);

module.exports = router;
