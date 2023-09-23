const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const Device = require('../models/device');
const User = require('../models/user');
const { format } = require('date-fns');

// __________________________________________get all notifications

// router.get('/', async (req, res) => {
//     try {
//       const notifications = await Notification.find()
//         .exec();
  
//       res.status(200).json(notifications);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });


router.get('/', async (req, res) => {
  try {
      const notifications = await Notification.find().exec();

      // Map notifications to include formatted createdAt
      const formattedNotifications = notifications.map(notification => ({
          _id: notification._id,
          device: notification.device,
          user: notification.user,
          message: notification.message,
          // Format createdAt as "DD/MM/YYYY" using date-fns
          createdAt: format(new Date(notification.createdAt), 'dd/MM/yyyy hh:mm:ss'),
          __v: notification.__v
      }));

      res.status(200).json(formattedNotifications);
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
