const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv/config");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/authValidator");

const register = async (req, res) => {
	const validate = registerSchema.safeParse(req.body);
	if (!validate.success)
		return res.status(400).json({ error: validate.error.errors });

	const { username, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({ username, password: hashedPassword });
		res.status(201).send("Registered successfully");
	} catch (err) {
		next(err);
	}
};

const login = async (req, res) => {
	const validate = loginSchema.safeParse(req.body);
	if (!validate.success)
		return res.status(400).json({ error: validate.error.errors });

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
		next(err);
	}
};

const getUser = async (req, res) => {
	try {
		const result = await User.find();
		if (!result)
			return res.status(401).json({ message: "Invalid credentials" });
		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
};
module.exports = { register, login, getUser };
