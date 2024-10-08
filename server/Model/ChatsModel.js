const mongoose = require("mongoose");
const ChatSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});
const ChatModel = mongoose.model("chat", ChatSchema);
module.exports = { ChatModel };
