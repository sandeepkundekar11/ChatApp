const mongoose = require("mongoose");
const GroupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    require: true,
  },
  groupmembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  ],
  groupadmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatModel",
    },
  ],
});

const GroupsModel = mongoose.model("group", GroupSchema);
module.exports = { GroupsModel };
