import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// Enhanced password validation
const validatePassword = (password) => {
  const errors = [];
  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  return errors;
};

// Email validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Enhanced register endpoint
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Enhanced validation
  if (!name?.trim() || name.trim().length < 2) {
    return res.status(400).json({ 
      message: "Name must be at least 2 characters" 
    });
  }

  if (!email?.trim() || !validateEmail(email.trim())) {
    return res.status(400).json({ 
      message: "Please provide a valid email address" 
    });
  }

  if (!password) {
    return res.status(400).json({ 
      message: "Password is required" 
    });
  }

  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    return res.status(400).json({ 
      message: "Password validation failed", 
      errors: passwordErrors 
    });
  }

  // Check if user exists
  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    return res.status(409).json({ 
      message: "Email already registered" 
    });
  }

  // Create user
  const user = await User.create({ 
    name: name.trim(), 
    email: email.toLowerCase().trim(), 
    password 
  });
  
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    },
    token
  });
});

// Enhanced login endpoint
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({ 
      message: "Email and password are required" 
    });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ 
      message: "Invalid email or password" 
    });
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    },
    token
  });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie("token").json({ 
    success: true, 
    message: "Logged out successfully" 
  });
});
