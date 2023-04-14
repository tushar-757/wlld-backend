/* eslint-disable no-console */

const mongoose = require("./connection");

const db = {};

db.mongoose = mongoose;

// models
db.Memer = require("../models/memer");
db.CampaignMeme = require("../models/campaignMeme");
db.MemerAccountDetails = require("../models/memerAccountDetail");
db.MemerTag = require("../models/memerTag");
db.MemerTag = require("../models/memerTag");
db.MemeType = require("../models/memeType");
db.FeaturedMeme = require("../models/featuredMeme");

db.BrandUser = require("../models/brandUser");
db.Brand = require("../models/brand");
db.BrandMemerGroup = require("../models/brandMemerGroup");
db.BrandGroupMemer = require("../models/brandGroupMemer");

db.Tag = require("../models/tag");

db.Campaign = require("../models/campaign");
db.CampaignMemer = require("../models/campaignMemer");
db.CampaignFormat = require("../models/campaignFormat");
db.CampaignResource = require("../models/campaignResource");
db.CampaignObjective = require("../models/campaignObjective");
db.CampaignMessage = require("../models/campaignMessage");
db.CampaignDo = require("../models/campaignDo");
db.CampaignDont = require("../models/campaignDont");
db.CampaignMeme = require("../models/campaignMeme");
db.CampaignMemeHistory = require("../models/campaignMemeHistory");
db.CampaignPayment = require("../models/campaignPayment");

db.Platform = require("../models/platform");
db.PlatformFormat = require("../models/platformFormat");
db.ResourceType = require("../models/platformFormat");

db.Bundle = require("../models/bundle");
db.BundleMemer = require("../models/bundleMemer");
db.BundleTag = require("../models/bundleTag");
db.Admin = require('../models/admin')

module.exports = db;
