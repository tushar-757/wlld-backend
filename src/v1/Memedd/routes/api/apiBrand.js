const express = require("express");

const router = express.Router();
const checkAuth = require("../../../../middleware/checkAuth");

/** Validator */
const v = require("../../../validators/validator");

/** Controller */
const brandController = require("../../controller/brandController");

/** Api Response */
router.get("/brands", checkAuth, brandController.getBrands);
router.post("/addbrand", checkAuth, brandController.addBrand);
router.post(
  "/addBrandMemerGroups",
  checkAuth,
  brandController.addBrandMemerGroups
);
router.delete(
  "/deleteBrandMemerGroups",
  checkAuth,
  brandController.deleteBrandMemerGroups
);
router.get(
  "/getBrandMemerGroups",
  checkAuth,
  brandController.getBrandMemerGroups
);
router.post(
  "/addMemerToBrandGroup",
  checkAuth,
  brandController.addMemerToBrandGroup
);
router.delete(
  "/removeMemerFromBrandGroup",
  checkAuth,
  brandController.removeMemerFromBrandGroup
);
router.get(
  "/getBrandGroupMemers",
  checkAuth,
  brandController.getBrandGroupMemers
);

router.get("/memer", checkAuth, brandController.getMemer);
router.get("/memer/memes", checkAuth, brandController.getMemerMemes);

module.exports = router;
