const mongoose = require("mongoose");

const ShoppingCartSchema = mongoose.Schema(
  {
    productID: {
      type: mongoose.Types.ObjectId,
      required: [true, "pleas provide product id"],
    },
    quantity: {
      type: Number,
      min: 1,
      required: [true, "pleas provide an quantity"],
    },
    userID: {
      type: mongoose.Types.ObjectId,
      required: [true, "pleas provide user id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
