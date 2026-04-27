const Doctor = require("../models/doctors");

const getAllDoctors = async (req, res) => {
	try {
		const result = await Doctor.find();
		res.status(200).json(result);
	} catch (err) {
		next(err)
	}
};

const getDoctorById = async (req, res) => {
	const doctorId = req.params.id;

	try {
		const result = await Doctor.findById({ _id: doctorId });
		res.status(200).json(result);
	} catch (err) {
		next(err)
	}
};

module.exports = { getAllDoctors, getDoctorById };
