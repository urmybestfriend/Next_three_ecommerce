const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    id: {
        type: String,
        required: true
      },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
      },
    order: {
      type: mongoose.Types.ObjectId,
      ref: "order",
      required: true
    },
    totalAmount: {
      type: String,
      required: true
    },
    checkout_url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    payment_status: {
      type: String,
      required: true
  },
    due_date: {
        type: Date
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payments", paymentSchema);
