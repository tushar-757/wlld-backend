const express = require("express");

const router = express.Router();
const checkAuth = require("../../../../middleware/checkAuth");

/** Validator */
const v = require("../../../validators/validator");

/** Controller */
const tagController = require("../../controller/tagController");

/** Api Response */
router.get("/", checkAuth, tagController.getTags);
router.post("/addtag", checkAuth, tagController.addTag);

module.exports = router;
