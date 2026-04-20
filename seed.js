const mongoose = require("mongoose");
const Doctor = require("./models/doctors");
require("dotenv/config");

const doctors = [
	{
		fullName: "Dr Eze",
		specialty: "Cardiology",
		availability: true,
		experience: 5,
	},
	{
		fullName: "Dr Steve",
		specialty: "Physiology",
		availability: true,
		experience: 7,
	},
	{
		fullName: "Dr Mary",
		specialty: "Neurology",
		availability: true,
		experience: 2,
	},
];

mongoose
	.connect(process.env.MONGO_URI)
	.then(async () => {
		await Doctor.deleteMany();
		await Doctor.insertMany(doctors);
		console.log("Doctors seeded");
		process.exit();
	})
	.catch((err) => console.log(err));
