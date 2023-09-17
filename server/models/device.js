const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true},
  picture: String,
  review:  String ,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

});

const Device = mongoose.model("Device", deviceSchema);

module.exports = { Device };
