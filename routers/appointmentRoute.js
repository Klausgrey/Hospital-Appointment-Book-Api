const express = require("express");
const router = express.Router();
const {
	postAppointment,
	getAppointment,
	patchAppointment,
} = require("../controllers/appointmentController");

router.post("/appointments", postAppointment);
router.get("/appointments", getAppointment);
router.patch("/appointments/:id", patchAppointment);

module.exports = router;
