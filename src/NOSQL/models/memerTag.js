const mongoose = require("mongoose");

const MemerTagSchema = mongoose.Schema(
  {
    memerId: { type: mongoose.Schema.ObjectId, required: true },
    tagId: { type: mongoose.Schema.ObjectId, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

MemerTagSchema.virtual("tag", {
  ref: "tag",
  localField: "tagId",
  foreignField: "_id",
  justOne: true,
});

MemerTagSchema.set("toObject", { virtuals: true });
MemerTagSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("memerTag", MemerTagSchema);
