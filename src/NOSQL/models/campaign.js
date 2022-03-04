const mongoose = require("mongoose");

const CampaignSchema = mongoose.Schema(
  {
    brandUserId: { type: mongoose.Schema.ObjectId, required: true },
    brandId: { type: mongoose.Schema.ObjectId, required: true },
    brandName: { type: String, required: true },
    campaignName: { type: String, required: true },
    description: { type: String, required: false },
    endDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    status: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
    poFileName: { type: String, default: null },
  },
  { timestamps: true }
);

CampaignSchema.virtual("brand", {
  ref: "brand",
  localField: "brandId",
  foreignField: "_id",
  justOne: true,
});

CampaignSchema.virtual("brandUser", {
  ref: "brandUser",
  localField: "brandUserId",
  foreignField: "_id",
  justOne: true,
});

CampaignSchema.virtual("campaignMemer", {
  ref: "campaignMemer",
  localField: "_id",
  foreignField: "campaignId",
  justOne: false,
});

CampaignSchema.virtual("campaignFormat", {
  ref: "campaignFormat",
  localField: "_id",
  foreignField: "campaignId",
  justOne: false,
});

CampaignSchema.virtual("campaignResource", {
  ref: "campaignResource",
  localField: "_id",
  foreignField: "campaignId",
  justOne: false,
});

CampaignSchema.virtual("campaignObjective", {
  ref: "campaignObjective",
  localField: "_id",
  foreignField: "campaignId",
  justOne: false,
});

CampaignSchema.virtual("campaignMessage", {
  ref: "campaignMessage",
  localField: "_id",
  foreignField: "campaignId",
  justOne: false,
});

CampaignSchema.virtual("campaignDo", {
  ref: "campaignDo",
  localField: "_id",
  foreignField: "campaignId",
  justOne: false,
});

CampaignSchema.virtual("campaignDont", {
  ref: "campaignDont",
  localField: "_id",
  foreignField: "campaignId",
  justOne: false,
});

CampaignSchema.set("toObject", { virtuals: true });
CampaignSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("campaign", CampaignSchema);
