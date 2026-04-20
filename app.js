const express = require("express");
const authRouter = require("./routers/authRouter");
const doctorRouter = require("./routers/doctorRouter");
const appointmentRoute = require("./routers/appointmentRoute");
const verifyToken = require("./middleware/auth");
const mongoose = require("mongoose");
require("dotenv/config");
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/", verifyToken, doctorRouter);
app.use("/", verifyToken, appointmentRoute);

mongoose
	.connect(MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

module.exports = app;
