const mongoose = require("mongoose");

const BundleSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    picture: { type: String, required: false },
    budget: { type: Number, default: 0 },
    memerCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BundleSchema.virtual("bundleTag", {
  ref: "bundleTag",
  localField: "_id",
  foreignField: "bundleId",
  justOne: false,
});

BundleSchema.set("toObject", { virtuals: true });
BundleSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("bundle", BundleSchema);
