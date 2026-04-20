const { uuidv7 } = require("uuidv7");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
	_id: { type: String, default: () => uuidv7() },
	username: { type: String, required: true },
	password: { type: String, required: true },
	date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
