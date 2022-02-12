const mongoose = require("mongoose");

const MemerAccountDetailsSchema = mongoose.Schema(
  {
    accountName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    accountType: { type: String, required: true },
    ifscCode: { type: String, required: true },
    memerId: { type: mongoose.Schema.ObjectId, required: true },
    firebaseToken: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "memerAccountDetails",
  MemerAccountDetailsSchema
);
