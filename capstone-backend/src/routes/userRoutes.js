import { Router } from "express";
// import { protect } from "../middleware/authMiddleware.js";
import {
  createUser,
  getAllUsers,
  getUser,
  getProfile,
  updateProfile,
  deleteUser
} from "../controllers/userController.js";

const router = Router();

// /api/users
router.post("/", /*protect,*/ createUser); // Create user
router.get("/", /*protect,*/ getAllUsers); // Get all users (admin only)

// /api/users/:id
router.get("/:id", /*protect,*/ getUser); // Get user by ID

// Profile routes (keeping existing endpoints for backward compatibility)
router.get("/profile/:id", /*protect,*/ getProfile);
router.put("/profile/:id", /*protect,*/ updateProfile);
router.delete("/user/:id", /*protect,*/ deleteUser);

export default router;