const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    words_per_minute: {
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
