const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users"
    },
    items: {
      type: Array

    },
    totalAmount: {
      type: mongoose.Types.Decimal128,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
