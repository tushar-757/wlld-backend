const mongoose = require("mongoose");

const BrandGroupMemerSchema = mongoose.Schema(
  {
    brandGroupId: { type: mongoose.Schema.ObjectId, required: true },
    memerId: { type: mongoose.Schema.ObjectId, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BrandGroupMemerSchema.virtual("memer", {
  ref: "memer",
  localField: "memerId",
  foreignField: "_id",
  justOne: false,
});

BrandGroupMemerSchema.set("toObject", { virtuals: true });
BrandGroupMemerSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("brandGroupMemer", BrandGroupMemerSchema);
