const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define the updated user schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  notifyEmail: String,
  phoneNumber: String,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
	  fullName: Joi.string().required().label("Full Name"),
	  email: Joi.string().email().required().label("Email"),
	  password: passwordComplexity().required().label("Password"),
	  notifyEmail: Joi.string().email().default('default@example.com').label("Notify Email"),
	  phoneNumber: Joi.string().default("00 000 000").label("Phone Number"),
	});
	return schema.validate(data);
  };
  
module.exports = { User, validate };
