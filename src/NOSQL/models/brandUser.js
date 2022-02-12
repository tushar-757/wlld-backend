const mongoose = require("mongoose");

const BrandUserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: Number, default: null },
    firebaseToken: { type: String, default: null },
    fcmToken: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BrandUserSchema.virtual("brand", {
  ref: "brand",
  localField: "_id",
  foreignField: "brandUserId",
  justOne: false,
});

BrandUserSchema.set("toObject", { virtuals: true });
BrandUserSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("brandUser", BrandUserSchema);
