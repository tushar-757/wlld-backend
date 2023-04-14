const express = require('express');
const checkAuth = require('../../../../middleware/checkAuth');
const cmsController = require("../../controller/cmsController");
const router = express.Router();

router.get('/admins',checkAuth,cmsController.getAdmins);
router.get('/memers',checkAuth,cmsController.getMemers);
router.get("/campaigns",checkAuth,cmsController?.getCampaigns)

module.exports = router;
