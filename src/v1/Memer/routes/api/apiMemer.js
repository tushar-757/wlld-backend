const express = require("express");

const router = express.Router();
const checkAuth = require("../../../../middleware/checkAuth");

/** Validator */
const v = require("../../../validators/validator");

/** Controller */
const memerController = require("../../controller/memerController");

/** Api Response */

router.get("/tags", memerController.getTags);

router.get("/", checkAuth, memerController.getMemers);
router.get("/:id", checkAuth, memerController.getMemerById);

router.post("/clients", checkAuth, memerController.getClients);
router.post("/transactions", checkAuth, memerController.getTransactions);
router.post("/getcampaigns", checkAuth, memerController.getCampaigns);
router.post("/addmemes", checkAuth, memerController.addMemes);
router.post("/addcampaignmemes", checkAuth, memerController.addCampaignMemes);

router.post("/updatefcmtoken", checkAuth, memerController.updateFCMToken);

module.exports = router;
