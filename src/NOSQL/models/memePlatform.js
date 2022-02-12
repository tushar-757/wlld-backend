const mongoose = require("mongoose");

const MemePlatformSchema = mongoose.Schema(
  {
    platformId: { type: mongoose.Schema.ObjectId, required: false },
    memeId: { type: mongoose.Schema.ObjectId, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("memePlatform", MemePlatformSchema);
