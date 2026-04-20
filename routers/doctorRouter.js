const express = require("express")
const router = express.Router()
const {
	getAllDoctors,
	getDoctorById,
} = require("../controllers/doctorController");

router.get("/doctors", getAllDoctors)
router.get("/doctors/:id", getDoctorById)

module.exports = router