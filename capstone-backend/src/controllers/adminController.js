import User from "../models/User.js";
import Post from "../models/Post.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const adminListUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

export const adminListPosts = asyncHandler(async (_req, res) => {
  const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });
  res.json(posts);
});

export const adminDeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await Post.deleteMany({ author: user._id }); // optional: cascade delete posts
  res.json({ message: "User and posts deleted" });
});

export const adminDeletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json({ message: "Post deleted" });
});
