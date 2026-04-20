const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv/config");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password)
		return res
			.status(400)
			.json({ message: "Enter a correct username and password" });
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({ username, password: hashedPassword });
		res.status(201).send("Registered successfully");
	} catch (err) {
		res.status(500).json({ message: "Server Error" });
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) return res.status(401).json({ message: "Invalid credentials" });

		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(401).json({ message: "Invalid credentials" });

		const token = jwt.sign(
			{
				id: user.id,
				username: user.username,
			},
			JWT_SECRET,
		);
		res.status(200).json({ message: "Login successfully", token });
	} catch (err) {
		res.status(500).json({ message: "Server Error" });
	}
};

const getUser = async (req, res) => {
	try {
		const result = await User.find();
		if (!result)
			return res.status(401).json({ message: "Invalid credentials" });
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ message: "Server Error" });
	}
};
module.exports = { register, login, getUser };
