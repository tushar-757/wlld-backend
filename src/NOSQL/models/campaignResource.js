const mongoose = require("mongoose");

const CampaignResourceSchema = mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.ObjectId, required: true },
    fileName: { type: String, required: true },
    resourceTypeId: { type: mongoose.Schema.ObjectId, required: true },
    description: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("campaignResource", CampaignResourceSchema);
