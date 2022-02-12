const mongoose = require("mongoose");

const BundleTagSchema = mongoose.Schema(
  {
    bundleId: { type: mongoose.Schema.ObjectId, required: true },
    tagId: { type: mongoose.Schema.ObjectId, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BundleTagSchema.virtual("tag", {
  ref: "tag",
  localField: "tagId",
  foreignField: "_id",
  justOne: true,
});

BundleTagSchema.set("toObject", { virtuals: true });
BundleTagSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("bundleTag", BundleTagSchema);
