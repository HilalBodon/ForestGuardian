const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  // devicePass:{ type: String, required: true },
  treeType: { type: String, required: true },
  treeHeight: { type: String, required: true},
  location: String,
  details:  String ,
  picture: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

});

const Device = mongoose.model("Device", deviceSchema);

module.exports = { Device };
