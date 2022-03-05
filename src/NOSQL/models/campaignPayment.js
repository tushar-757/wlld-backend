const mongoose = require("mongoose");

const CampaignPaymentSchema = mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.ObjectId, required: true },
    amount: { type: Number, default: 0, required: true },
    paymentfileName: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("campaignPayment", CampaignPaymentSchema);
