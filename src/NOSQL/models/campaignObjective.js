const mongoose = require("mongoose");

const CampaignObjectiveSchema = mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.ObjectId, required: true },
    objective: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("campaignObjective", CampaignObjectiveSchema);
