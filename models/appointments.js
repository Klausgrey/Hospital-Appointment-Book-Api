const mongoose = require("mongoose");
const { uuidv7 } = require("uuidv7");

const appointmentSchema = new mongoose.Schema({
	_id: { type: String, default: () => uuidv7() },
	patientId: { type: String, ref: "User" },
	doctorId: { type: String, ref: "Doctor" },
	appointmentDate: { type: Date, default: Date.now },
	status: {
		type: String,
		enum: ["pending", "confirmed", "cancelled"],
		default: "pending",
	},
	reason: { type: String, required: true },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
