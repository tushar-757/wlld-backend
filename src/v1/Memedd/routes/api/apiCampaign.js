const express = require("express");

const router = express.Router();
const checkAuth = require("../../../../middleware/checkAuth");

/** Validator */
const v = require("../../../validators/validator");

/** Controller */
const campaignController = require("../../controller/campaignController");

/** Api Response */
router.get("/", checkAuth, campaignController.getBrandUserCampaigns);
router.post("/get", checkAuth, campaignController.getCampaign);
router.post("/add", checkAuth, campaignController.addCampaign);
router.put("/update", checkAuth, campaignController.updateCampaign);
router.post("/meme", checkAuth, campaignController.getCampaignMemes);
router.post(
  "/meme/history",
  checkAuth,
  campaignController.getCampaignMemeHistory
);

// Campaign Memers
router.post("/memer/", checkAuth, campaignController.getCampaignMemers);
router.post("/memer/add", checkAuth, campaignController.addCampaignMemer);
router.delete(
  "/memer/delete",
  checkAuth,
  campaignController.deleteCampaignMemer
);

// Campaign Formats
router.post("/format/get", checkAuth, campaignController.getCampaignFormat);
router.post("/format/add", checkAuth, campaignController.addCampaignFormat);
router.delete(
  "/format/delete",
  checkAuth,
  campaignController.deleteCampaignFormat
);

// Campaign Resources
router.post("/resource/get", checkAuth, campaignController.getCampaignResource);
router.post("/resource/add", checkAuth, campaignController.addCampaignResource);
router.delete(
  "/resource/delete",
  checkAuth,
  campaignController.deleteCampaignResource
);

// Campaign Objective
router.post(
  "/objective/get",
  checkAuth,
  campaignController.getCampaignObjective
);
router.post(
  "/objective/add",
  checkAuth,
  campaignController.addCampaignObjective
);
router.put(
  "/objective/update",
  checkAuth,
  campaignController.updateCampaignObjective
);
router.delete(
  "/objective/delete",
  checkAuth,
  campaignController.deleteCampaignObjective
);

// Campaign Messages
router.post("/message/get", checkAuth, campaignController.getCampaignMessage);
router.post("/message/add", checkAuth, campaignController.addCampaignMessage);
router.put(
  "/message/update",
  checkAuth,
  campaignController.updateCampaignMessage
);
router.delete(
  "/message/delete",
  checkAuth,
  campaignController.deleteCampaignMessage
);

// Campaign Dos
router.post("/do/get", checkAuth, campaignController.getCampaignDo);
router.post("/do/add", checkAuth, campaignController.addCampaignDo);
router.put("/do/update", checkAuth, campaignController.updateCampaignDo);
router.delete("/do/delete", checkAuth, campaignController.deleteCampaignDo);

// Campaign Donts
router.post("/Dont/get", checkAuth, campaignController.getCampaignDont);
router.post("/Dont/add", checkAuth, campaignController.addCampaignDont);
router.put("/Dont/update", checkAuth, campaignController.updateCampaignDont);
router.delete("/Dont/delete", checkAuth, campaignController.deleteCampaignDont);

router.post("/finalize", checkAuth, campaignController.finalizeCampaign);
router.post("/price", checkAuth, campaignController.campaignPrice);
router.put("/upload-po", checkAuth, campaignController.uploadPO);

module.exports = router;
