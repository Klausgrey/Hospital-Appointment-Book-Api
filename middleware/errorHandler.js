const errorHandler = (err, req, res, next) => {
	console.error(err.stack)
	return res.status(500).json({status: "error", message: err.message || "An unexpected error has occured"})
}

module.exports = errorHandler