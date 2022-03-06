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

CampaignFormatSchema.virtual("platform", {
  ref: "platform",
  localField: "platformId",
  foreignField: "_id",
  justOne: true,
});

CampaignFormatSchema.virtual("platformFormat", {
  ref: "platformFormat",
  localField: "formatId",
  foreignField: "_id",
  justOne: true,
});

CampaignFormatSchema.set("toObject", { virtuals: true });
CampaignFormatSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("campaignFormat", CampaignFormatSchema);
