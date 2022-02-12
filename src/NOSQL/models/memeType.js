const mongoose = require("mongoose");

const MemeTypeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("memeType", MemeTypeSchema);
