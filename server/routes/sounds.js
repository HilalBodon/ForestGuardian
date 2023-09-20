// const express = require('express');
// const router = express.Router();
// const Sound = require('../models/sound');

// router.post('/sounds', async (req, res) => {
//   try {
//     const { deviceId, soundType } = req.body; 

//     const sound = new Sound({
//       device: deviceId,
//       soundType: soundType,
//     });

//     await sound.save();

//     res.status(201).json(sound);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// router.get('/devices/:deviceId/sounds', async (req, res) => {
//   try {
//     const deviceId = req.params.deviceId;

//     const sounds = await Sound.find({ device: deviceId });

//     res.status(200).json(sounds);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
