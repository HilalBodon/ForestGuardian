const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const Device = require('../models/device');
const User = require('../models/user');


// __________________________________________get all notifications

router.get('/', async (req, res) => {
    try {
      const notifications = await Notification.find()
        .populate('device', 'name') 
        .populate('user', 'firstName lastName')
        .exec();
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// ___________________________________________________________//send notification
router.post('/', async (req, res) => {
  try {
    const { device, user, message } = req.body;

    const notification = new Notification({
      device,
      user,
      message,
    });

    await notification.save();

    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
