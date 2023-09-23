const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  createdAt: {type: Date,default: Date.now,},
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;




