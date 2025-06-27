const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { protect } = require("../middlewares/authMiddleware");

// Generate JWT

const generateToken = (userId) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

//@desc Register a new user
//@route POST /api/auth/register
//@access Public
const registerUser = async (req, res) => {
	try {
		const { name, email, password, profileImageUrl, adminInviteToken } =
			req.body;
		//Check if user exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		// determine user role: admin if correct token is provided, otherwise user
		let role = "user";
		if (
			adminInviteToken &&
			adminInviteToken === process.env.ADMIN_INVITE_TOKEN
		) {
			role = "admin";
		}

		//Hash password

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//Create New User
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			profileImageUrl,
			role,
		});

		//Return user data with JWT
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			profileImageUrl: user.profileImageUrl,
			token: generateToken(user._id),
		});
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//@desc Login user
//@route POST /api/auth/login
//@access Public
const loginUser = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//@desc Get user profile
//@route GET /api/auth/profile
//@access Private  (requires JWT)
const getUserProfile = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

//@desc Update user profile
//@route PUT /api/auth/profile
//@access Private (requires JWT)
const updateUserProfile = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

module.exports = {
	registerUser,
	loginUser,
	getUserProfile,
	updateUserProfile,
};
