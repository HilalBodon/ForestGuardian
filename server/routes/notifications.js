const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const Device = require('../models/device');
const { User } = require('../models/user');
const { format } = require('date-fns');
const mongoose = require('mongoose');
// __________________________________________get all notifications

 

router.get('/', async (req, res) => {
  try {
      const notifications = await Notification.find().exec();

      const formattedNotifications = notifications.map(notification => ({
          _id: notification._id,
          device: notification.device,
          user: notification.user,
          message: notification.message,
          createdAt: format(new Date(notification.createdAt), 'dd/MM/yyyy hh:mm:ss'),
          __v: notification.__v
      }));

      res.status(200).json(formattedNotifications);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error1' });
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
    res.status(500).json({ error: 'Internal server error2' });
  }
});

// _______________________________________________________________
// get notifications of the user :


router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const notifications = await Notification.find({ user: userId })
    .populate('device', 'deviceName') 
    .populate('user', 'firstName lastName')
    .exec();
  
    const formattedNotifications = notifications.map(notification => ({
      _id: notification._id,
      device: notification.device,
      user: notification.user,
      message: notification.message,
      createdAt: format(new Date(notification.createdAt), 'dd/MM/yyyy hh:mm:ss'),
      __v: notification.__v
    }));

    res.status(200).json(formattedNotifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error3' });
  }
});
// ____________________________________________
// delete all notifications by user id

router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    await Notification.deleteMany({ user: userId });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting notifications:', error);
    res.status(500).json({ error: 'Internal server error4' });
  }
});



// router.get("/analytics/analytics", async (req, res) => {
//   try {
//     const notificationCounts = await Notification.aggregate([
//       {
//         $group: {
//           _id: "$device", // Group by device ID
//           count: { $sum: 1 }, // Count the notifications
//         },
//       },
//       { $sort: { count: -1 } },
//     ]);

//     // Map device IDs to strings
//     const devices = notificationCounts.map((item) =>
//       item._id ? item._id.toString() : ""
//     );

//     const counts = notificationCounts.map((item) =>
//       item.count ? item.count : 0
//     );

//     res.json({ notificationCounts: devices, notificationCount: counts });
//   } catch (error) {
//     console.error("Error fetching analytics data:", error);
//     res.status(200).json({ error });
//   }
// });

router.get("/analytics/analytics/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; 

    const notificationCounts = await Notification.aggregate([
      {
        $match: { user: mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: "$device", 
          count: { $sum: 1 }, 
        },
      },
      { $sort: { count: -1 } },
    ]);

    const devices = notificationCounts.map((item) =>
      item._id ? item._id.toString() : ""
    );

    const counts = notificationCounts.map((item) =>
      item.count ? item.count : 0
    );

    res.json({ Devices: devices, notificationCount: counts });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(200).json({ error });
  }
});



module.exports = router;
