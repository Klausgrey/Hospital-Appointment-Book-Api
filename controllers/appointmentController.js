const Appointment = require("../models/appointments");
const User = require("../models/user");

const postAppointment = async (req, res) => {
	const patientId = req.user.id;
	const { doctorId, reason } = req.body;

	try {
		const result = await User.findById(patientId);
		if (!result) return res.status(400).json({ message: "bad request" });

		await Appointment.create({ patientId, doctorId, reason });
		res.status(200).json({ message: "Appointment booked" });
	} catch (err) {
		next(err)
	}
};

const getAppointment = async (req, res) => {
	const patientId = req.user.id;

	try {
		const result = await User.findById(patientId);
		if (!result) return res.status(400).json({ message: "bad request" });

		const appiontments = await Appointment.find({ patientId });
		res.status(200).json(appiontments);
	} catch (err) {
		next(err)
	}
};

const patchAppointment = async (req, res) => {
	const status = req.body.status;
	const appiontmentId = req.params.id;
	try {
		const result = await Appointment.findById(appiontmentId);
		if (!result) return res.status(400).json({ message: "bad request" });
		await Appointment.findByIdAndUpdate({ _id: appiontmentId }, { status });
		res.status(200).json({ message: "Updates successfully" });
	} catch (err) {
		next(err)
	}
};

const deleteAppiontments = async (req, res) => {
  const appointmentstId = req.params.id;
  let patientId = req.user.id

  try {
    let result = await Appointment.findById(appointmentstId)
    if (result.patientId != patientId) return res.status(400).json(message: "Wrong Id passed to be deleted`);
    ")
    await Appointment.findByIdandDelete(patientId)
    res.status(200).json({message: "Deleted:"})

  } catch(err) {
    next(err)
  }
}
module.exports = { postAppointment, getAppointment, patchAppointment };
