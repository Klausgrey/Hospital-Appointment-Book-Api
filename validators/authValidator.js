const { z } = require("zod");

const registerSchema = z.object({
	username: z.string().min(3),
	password: z.string().min(3),
});

module.exports = { registerSchema };
