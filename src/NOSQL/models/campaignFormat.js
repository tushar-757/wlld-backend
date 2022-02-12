const mongoose = require("mongoose");

const CampaignFormatSchema = mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.ObjectId, required: true },
    formatId: { type: mongoose.Schema.ObjectId, required: true },
    platformId: { type: mongoose.Schema.ObjectId, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("campaignFormat", CampaignFormatSchema);
