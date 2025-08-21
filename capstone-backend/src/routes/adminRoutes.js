import { Router } from "express";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { adminDeletePost, adminDeleteUser, adminListPosts, adminListUsers } from "../controllers/adminController.js";

const router = Router();

// /admin
// router.use(protect, adminOnly);

router.get("/users", adminListUsers);
router.get("/posts", adminListPosts);
router.delete("/users/:id", adminDeleteUser);
router.delete("/posts/:id", adminDeletePost);

export default router;
