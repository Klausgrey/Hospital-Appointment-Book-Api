const jwt = require("jsonwebtoken");
require("dotenv/config");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
	const auth = req.headers.authorization;
	if (!auth) return res.status(401).json({ message: "something went wrong" });

	const token = auth.split(" ")[1];
	if (!token) return res.status(401).json({ message: "something went wrong" });

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(500).json({ message: "Server Error" });
	}
};


module.exports = verifyToken