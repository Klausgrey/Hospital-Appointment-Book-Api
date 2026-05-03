const express = require("express");
const router = express.Router();
const {
  postAppointment,
  getAppointment,
  patchAppointment,
  deleteAppiontments,
  getSummary,
} = require("../controllers/appointmentController");

router.post("/appointments", postAppointment);
router.get("/appointments", getAppointment);
router.patch("/appointments/:id", patchAppointment);
router.delete("/appointments/:id", deleteAppiontments);
router.get("/appointments/summary", getSummary);

module.exports = router;
