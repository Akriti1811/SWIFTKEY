const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    net: {
      type: String,
      trim: true,
      required: true,
    },
    gross: {
      type: String,
      trim: true,
      required: true,
    },
    accuracy: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
