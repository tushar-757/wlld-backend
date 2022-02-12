const mongoose = require("mongoose");

const CampaignDontSchema = mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.ObjectId, required: true },
    dontMessage: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("campaignDont", CampaignDontSchema);
