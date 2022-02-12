const mongoose = require("mongoose");

const PlatformSchema = mongoose.Schema(
  {
    platformName: { type: String, required: true },
    logo: { type: String, default: null },
    background: { type: String, default: null },
    description: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

PlatformSchema.virtual("platformFormat", {
  ref: "platformFormat",
  localField: "_id",
  foreignField: "platformId",
  justOne: false,
});

PlatformSchema.set("toObject", { virtuals: true });
PlatformSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("platform", PlatformSchema);
