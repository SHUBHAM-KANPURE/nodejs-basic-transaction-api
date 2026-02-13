const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user_id: {
      type: String
    },
    amount: {
      type: Number
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Wallet", Schema);
