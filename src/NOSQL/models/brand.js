const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    description: { type: String, required: true },
    brandUserId: { type: mongoose.Schema.ObjectId, required: true },
    website: { type: String, required: true },
    brandLogo: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("brand", BrandSchema);
