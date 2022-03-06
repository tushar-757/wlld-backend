const mongoose = require("mongoose");

const CampaignMemeSchema = mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.ObjectId, required: false },
    caption: { type: String, required: false },
    fileName: { type: String, default: null },
    filetype: { type: String, default: null },
    platformId: { type: mongoose.Schema.ObjectId, required: false },
    formatId: { type: mongoose.Schema.ObjectId, required: false },
    messagePath: { type: String, required: false },
    name: { type: String, default: null },
    status: {
      type: String,
      enum: ["APPROVED", "REJECTED", "PENDING"],
      default: "PENDING",
    },
    memerId: { type: mongoose.Schema.ObjectId, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CampaignMemeSchema.virtual("memer", {
  ref: "memer",
  localField: "memerId",
  foreignField: "_id",
  justOne: true,
});

CampaignMemeSchema.virtual("campaignMemer", {
  ref: "campaignMemer",
  localField: "memerId",
  foreignField: "memerId",
  justOne: true,
});

CampaignMemeSchema.set("toObject", { virtuals: true });
CampaignMemeSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("campaignMeme", CampaignMemeSchema);
