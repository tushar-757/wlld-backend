const mongoose = require("mongoose");

const PlatformFormatSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    platformId: { type: mongoose.Schema.ObjectId, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("platformFormat", PlatformFormatSchema);
