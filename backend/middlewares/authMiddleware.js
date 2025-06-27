const jwt = require("jsonwebtoken");
const user = require("../models/user");

// Middleware to protect routes
const protect = async (req, res, next) => {
	try {
		let token = req.headers.authorization;
		if (token && token.startsWith("Bearer")) {
			token = token.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await user.findById(decoded.id).select("-password");
			next();
		} else {
			res.status(401).json({ message: "brake yo self fool" });
		}
	} catch (error) {
		res.status(401).json({ message: "Not authorized, token failed" });
	}
};

// Middleware for Admin access
const adminOnly = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		res.status(403).json({ message: "Access denied, admin only" });
	}
};

module.exports = { protect, adminOnly };
