const express = require("express");

const router = express.Router();
const checkAuth = require("../../../../middleware/checkAuth");

/** Validator */
const v = require("../../../validators/validator");

/** Controller */
const bundleController = require("../../controller/bundleController");

/** Api Response */
router.get("/", checkAuth, bundleController.getBundle);
router.post("/memers", checkAuth, bundleController.getBundleMemers);
router.get("/all", checkAuth, bundleController.getAllBundles);

module.exports = router;
