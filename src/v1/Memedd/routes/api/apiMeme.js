const express = require("express");

const router = express.Router();
const checkAuth = require("../../../../middleware/checkAuth");

/** Validator */
const v = require("../../../validators/validator");

/** Controller */
const memeController = require("../../controller/memeController");

/** Api Response */
router.get("/getmediatypes", checkAuth, memeController.getMemeTypes);
router.post("/updatememe", checkAuth, memeController.updateMeme);

module.exports = router;
