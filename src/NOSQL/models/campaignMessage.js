const mongoose = require("mongoose");

const CampaignMessageSchema = mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.ObjectId, required: true },
    message: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("campaignMessage", CampaignMessageSchema);
