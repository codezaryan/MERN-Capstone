import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new user (signup)
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, avatarUrl } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and password"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long"
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ 
      success: false,
      message: "User already exists with this email" 
    });
  }

  // Create new user
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    role: role || "user",
    avatarUrl: avatarUrl || ""
  });

  // Generate JWT token using the model method
  const token = user.generateAuthToken();

  // Return user without password
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };

  // Set token as cookie (optional)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: userResponse,
    token // Also send token in response body
  });
});

// Get all users (admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  
  res.json({
    success: true,
    count: users.length,
    users
  });
});

// Get user by ID
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  res.json({
    success: true,
    user
  });
});

// Get user profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  res.json({
    success: true,
    user
  });
});

// Update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  // Allow user to update their own profile or admin to update any profile
  if (req.user._id.toString() !== req.params.id && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: You can only update your own profile"
    });
  }

  const updates = { 
    name: req.body.name, 
    avatarUrl: req.body.avatarUrl,
    ...(req.user.role === "admin" && { role: req.body.role }) // Only admin can update role
  };
  
  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  }).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.json({
    success: true,
    message: "Profile updated successfully",
    user
  });
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
  // Allow user to delete their own account or admin to delete any account
  if (req.user._id.toString() !== req.params.id && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: You can only delete your own account"
    });
  }
  
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.json({
    success: true,
    message: "User deleted successfully"
  });
});