const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { Device } = require("../models/device");
const { User } = require("../models/user");
const mongoose = require("mongoose"); 

mongoose.model('User', User.schema);
// ___________________________________________________
router.post('/',authMiddleware, async (req, res) => {
    try {
      const { devicename, devicePass,treeType, treeHeigh, location,details,picture } = req.body;

      const userId = req.user._id;
      const user = await User.findById(userId);
      const newDevice = new Device({devicename, devicePass,treeType, treeHeigh, location,details,picture });
      await newDevice.save();
      res.status(201).send(newDevice);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
//   _____________________________________________________

//   router.get('/my-devices', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const userDevices = await Device.find({ user: userId });
//         res.status(200).send(userDevices);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });


// ________________________________________________________
  router.get('/',authMiddleware, async (req, res) => {
    try {
    const devices = await Device.find();
    res.status(200).send(devices);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
// _______________________________________________________

module.exports = router;


// router.get('/discover',authMiddleware, async (req, res) => {
//     try {
//       const { genre, author, keywords } = req.query;
//       const query = {};
  
//       if (genre) {
//         query.genre = genre;
//       }
  
//       if (author) {
//         query.author = author;
//       }
  
//       if (keywords) {
//         query.$or = [
//           { name: { $regex: keywords, $options: 'i' } },
//           { author: { $regex: keywords, $options: 'i' } },
//           { review: { $regex: keywords, $options: 'i' } },
//         ];
//       }
  
//       const books = await Device.find(query).populate('user');
//       res.status(200).send(books);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ message: "Internal server Error" });
//     }
//   });
// ____________________________________________________________________

// router.post('/like/:bookId', authMiddleware, async (req, res) => {
//     try {
//         const loggedInUserId = req.user._id;
//         const bookIdToLike = req.params.bookId;

//         const loggedInUser = await User.findById(loggedInUserId);
//         const bookToLike = await Device.findById(bookIdToLike);

//         if (!bookToLike) {
//             return res.status(404).send({ message: "Device not found" });
//         }

//         if (bookToLike.likes === loggedInUserId) {
//             return res.status(400).send({ message: "You've already liked this Device" });
//         }

//         bookToLike.likes.push(loggedInUserId);
//         await bookToLike.save();

//         res.status(200).send({ message: "Device liked successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });
// _________________________________________________________________

// router.post('/remove-like/:bookId', authMiddleware, async (req, res) => {
//     try {
//         const bookId = req.params.bookId;
//         const userId = req.user._id;

//         const bookToUpdate = await Device.findById(bookId);
//         if (!bookToUpdate) {
//             return res.status(404).send({ message: "Device not found" });
//         }

//         if (bookToUpdate.likes === 0) {
//             return res.status(400).send({ message: "Device has no likes to remove" });
//         }

//         if (!bookToUpdate.likes.includes(userId)) {
//             return res.status(400).send({ message: "User has not liked the Device" });
//         }

//         const updatedLikes = bookToUpdate.likes.filter(like => like.toString() !== userId.toString()
//           );
          
//         await Device.findByIdAndUpdate(bookId, {
//             likes: updatedLikes,
//             likesCount: updatedLikes.length
//                 });

//         res.status(200).send({ message: "Like removed successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });
// _______________________________________________________________

// router.get('/recommended', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user._id;

//         const following = await User.findById(userId).select('following');

//         const recommendedBooks = await Device.find({ user: { $in: following.following } });

//         res.status(200).send(recommendedBooks);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });

