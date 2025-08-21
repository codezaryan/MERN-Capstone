import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  getPost,
  likePost,
  listPosts,
  updatePost
} from "../controllers/postController.js";

const router = Router();

// Public routes
router.get("/", listPosts);          // Changed from "/posts" to "/"
router.get("/:id", getPost);         // Changed from "/posts/:id" to "/:id"

// Protected routes
router.post("/", protect, createPost);                    // Changed to "/"
router.put("/:id", protect, updatePost);                 // Changed to "/:id"
router.delete("/:id", protect, deletePost);              // Changed to "/:id"
router.post("/:id/like", protect, likePost);             // Changed to "/:id/like"
router.post("/:id/comments", protect, addComment);       // Changed to "/:id/comments"
router.delete("/:id/comments/:commentId", protect, deleteComment); // Changed

export default router;