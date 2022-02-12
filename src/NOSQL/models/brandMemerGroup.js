const mongoose = require("mongoose");

const BrandMemerGroupSchema = mongoose.Schema(
  {
    brandUserId: { type: mongoose.Schema.ObjectId, required: true },
    description: { type: String, default: null },
    name: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("brandMemerGroup", BrandMemerGroupSchema);
