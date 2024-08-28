const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  socketid: String,
  Groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupsModel",
    },
  ],
  Users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  ],
});

const userModel = mongoose.model("user", UserSchema);

module.exports = { userModel };
