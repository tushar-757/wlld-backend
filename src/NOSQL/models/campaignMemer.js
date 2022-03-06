const mongoose = require("mongoose");

const CampaignMemerSchema = mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.ObjectId, required: true },
    memerId: { type: mongoose.Schema.ObjectId, required: true },
    name: { type: String, required: false },
    quantity: { type: Number, required: true },
    submittedMemes: { type: Number, default: 0 },
    approvedMemes: { type: Number, default: 0 },
    rejectedMemes: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CampaignMemerSchema.virtual("memer", {
  ref: "memer",
  localField: "memerId",
  foreignField: "_id",
  justOne: true,
});

CampaignMemerSchema.virtual("campaign", {
  ref: "campaign",
  localField: "campaignId",
  foreignField: "_id",
  justOne: true,
});

CampaignMemerSchema.set("toObject", { virtuals: true });
CampaignMemerSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("campaignMemer", CampaignMemerSchema);
