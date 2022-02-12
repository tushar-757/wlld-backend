const mongoose = require("mongoose");

const ResourceTypeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("resourceType", ResourceTypeSchema);
