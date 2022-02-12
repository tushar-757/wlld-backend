const mongoose = require("mongoose");

const MemerMemePriceSchema = mongoose.Schema(
  {
    memer_id: { type: Number, required: true },
    memer_meme_format: { type: Number, default: null },
    price: { type: Number, required: true },
    created_at: { type: Date, default: new Date() },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("memerMemePrice", MemerMemePriceSchema);
