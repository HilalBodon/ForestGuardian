const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validate } = require("../models/user"); 

 router.post("/", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).send({ message: "Invalid Email or Password1" });
		}

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) {
			return res.status(401).send({ message: "Invalid Email or Password2" });
		}

		// const token = jwt.sign({firstName, lastName, email, _id}, process.env.JWT_SECRET)
		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });

	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
