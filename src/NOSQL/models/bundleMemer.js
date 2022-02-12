const mongoose = require("mongoose");

const BundleMemerSchema = mongoose.Schema(
  {
    bundleId: { type: mongoose.Schema.ObjectId, required: true },
    memerId: { type: mongoose.Schema.ObjectId, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BundleMemerSchema.virtual("memer", {
  ref: "memer",
  localField: "memerId",
  foreignField: "_id",
  justOne: false,
});

BundleMemerSchema.set("toObject", { virtuals: true });
BundleMemerSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("bundleMemer", BundleMemerSchema);
