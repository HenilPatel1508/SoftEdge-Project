const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    room: String,
    author: String,
    receiver: String,
    message: String,
    time: String,

    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);