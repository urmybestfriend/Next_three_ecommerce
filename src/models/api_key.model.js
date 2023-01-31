const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
  {
    api_key: {
      type: String,
      required: true,
      unique: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("api_keys", apiKeySchema);
