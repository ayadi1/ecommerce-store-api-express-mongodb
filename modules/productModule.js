const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "please provide name"],
      minlength: 4,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "please provide user id"],
      ref: "User",
    },
    quantity: {
      type: Number,
      min: 0,
    },
    company: {
      type: String,
      required: [true, "please provide company name"],
      minlength: 4,
      maxlength: 50,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
      max: 10000,
    },
    metaDescription: {
      type: String,
      minlength: 4,
    },
    metaKeywords: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
