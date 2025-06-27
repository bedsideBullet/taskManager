const express = require("express");
const {
	registerUser,
	loginUser,
	getUserProfile,
	updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const Router = express.Router();

// Auth Routes
Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.get("/profile", protect, getUserProfile);
Router.put("/profile", protect, updateUserProfile);

module.exports = Router;
