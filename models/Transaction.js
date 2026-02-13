const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user_id: {
      type: String
    },
    transaction_id: {
        type: String
    },
    type: {
      type: String
    },
    amount: {
      type: Number
    },
    status: {
      type: String
    },
    reference_id: {
      type: String
    },
    action: {
        type: String
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Transaction", Schema);
