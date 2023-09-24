const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const authMiddleware = require('../middlewares/auth.middleware');

// get the user info
  router.get("/:userId", authMiddleware, async (req, res) => {
	try {
	  const userId = req.user._id;
  
	  const user = await User.findById(userId);
  
	  if (!user) {
		return res.status(404).json({ message: "User not found" });
	  }
  
	  res.status(200).json({ user });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: "Internal Server Error" });
	}
  });


// update the user
router.put('/:userId', async (req, res) => {
	try {
	  const userId = req.params.userId;
	  const updatedUserData = req.body;
  
	  const updatedUser = await User.findOneAndUpdate({ _id: userId }, updatedUserData, { new: true });
  
	  if (!updatedUser) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  return res.status(200).json(updatedUser);
	} catch (error) {
	  console.error(error);
	  return res.status(500).json({ message: 'Internal server error' });
	}
  });  


// user registration
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

// _____________________________________________________________________________

// router.post('/follow/:userId', authMiddleware, async (req, res) => {
// 	try {
// 	  const loggedInUserId = req.user._id;
// 	  const userToFollowId = req.params.userId;
  
// 	  await User.findByIdAndUpdate(loggedInUserId, { $addToSet: { following: userToFollowId } });
// 	  await User.findByIdAndUpdate(userToFollowId, { $addToSet: { followers: loggedInUserId } });
  
// 	  res.status(200).send({ message: 'Successfully followed user.' });
// 	} catch (error) {
// 	  console.error(error);
// 	  res.status(500).send({ message: 'Internal Server Error' });
// 	}
//   });
  
//   router.post('/unfollow/:userId', authMiddleware, async (req, res) => {
// 	try {
// 	  const loggedInUserId = req.user._id;
// 	  const userToUnfollowId = req.params.userId;
  
// 	  await User.findByIdAndUpdate(loggedInUserId, { $pull: { following: userToUnfollowId } });
// 	  await User.findByIdAndUpdate(userToUnfollowId, { $pull: { followers: loggedInUserId } });
  
// 	  res.status(200).send({ message: 'Successfully unfollowed user.' });
// 	} catch (error) {
// 	  console.error(error);
// 	  res.status(500).send({ message: 'Internal Server Error' });
// 	}
//   });

//   router.get('/status/:userId/:deviceId', authMiddleware, async (req, res) => {
// 	try {
// 	  const loggedInUserId = req.user._id;
// 	  const deviceId = req.params.deviceId;
  
// 	  const user = await User.findById(loggedInUserId);
// 	  const isLiked = user.likes.includes(deviceId);
// 	  const isFollowing = user.following.includes(deviceId);
  
// 	  res.status(200).json({ isLiked, isFollowing });
// 	} catch (error) {
// 	  console.error(error);
// 	  res.status(500).send({ message: "Internal Server Error" });
// 	}
//   });
// ____________________________________________________________________________

