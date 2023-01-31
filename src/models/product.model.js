const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true
    },
    quantity: {
        type: Number,
        required: true
      },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productSchema);
