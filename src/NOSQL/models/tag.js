const mongoose = require("mongoose");

const TagSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: false },
    description: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tag", TagSchema);
