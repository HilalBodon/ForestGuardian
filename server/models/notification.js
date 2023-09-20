const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: Date,
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;




// const notificationSchema = new mongoose.Schema({
//   message: String,
//   timestamp: Date,
//   device: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Device", 
//   },
// });

// const Notification = mongoose.model("Notification", notificationSchema);

// module.exports = { Notification };
