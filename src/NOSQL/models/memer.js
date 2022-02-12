const mongoose = require("mongoose");

const MemerSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNo: { type: Number, default: null },
    picture: { type: String, default: "" },
    price: { type: Number, required: true },
    fcmToken: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

MemerSchema.virtual("memerAccountDetails", {
  ref: "memerAccountDetails",
  localField: "_id",
  foreignField: "memerId",
  justOne: true,
});

MemerSchema.virtual("memerTag", {
  ref: "memerTag",
  localField: "_id",
  foreignField: "memerId",
  justOne: false,
});

MemerSchema.set("toObject", { virtuals: true });
MemerSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("memer", MemerSchema);
