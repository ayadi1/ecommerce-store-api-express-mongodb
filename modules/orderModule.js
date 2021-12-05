const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    productID: {
      type: mongoose.Types.ObjectId,
      required: [true, "pleas provide a product id"],
    },
    quantity: {
      type: Number,
      required: [true, "pleas provide a quantity"],
    },
    userID: {
      type: mongoose.Types.ObjectId,
      required: [true, "pleas provide user id"],
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Cancelled",
        "Partially Refunded",
        "Shipped",
        "completed",
      ],
      required: true,
      default: "Pending",
    },
    isPays: {
      type: Boolean,
      default: false,
    },
    trackingNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
