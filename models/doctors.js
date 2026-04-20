const mongoose = require("mongoose");
const { uuidv7 } = require("uuidv7");

const doctorSchema = new mongoose.Schema({
	_id: { type: String, default: () => uuidv7() },
	fullName: { type: String, required: true },
	specialty: { type: String, required: true },
	availability: { type: Boolean, default: true },
	experience: { type: Number, required: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
