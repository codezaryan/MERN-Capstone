import Post from "../models/Post.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listPosts = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 10);
  const q = (req.query.q || "").trim();

  const filter = q
    ? { $or: [{ title: new RegExp(q, "i") }, { content: new RegExp(q, "i") }] }
    : {};

  const [items, total] = await Promise.all([
    Post.find(filter)
      .populate("author", "name email")
      .populate("likes", "name email")
      .populate("comments.user", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Post.countDocuments(filter)
  ]);

  res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
});

export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author", "name email")
    .populate("likes", "name email")
    .populate("comments.user", "name email");
  
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
});

export const createPost = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;
  
  // Validation
  if (!title?.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!content?.trim()) {
    return res.status(400).json({ message: "Content is required" });
  }

  // Create post
  const post = await Post.create({
    title: title.trim(),
    content: content.trim(),
    image: image || "",
    author: req.user._id
  });

  // Populate author info and return
  const populatedPost = await Post.findById(post._id)
    .populate("author", "name email");
  
  res.status(201).json(populatedPost);
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Check ownership/admin rights
  const isOwner = post.author.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  // Update fields
  const { title, content, image } = req.body;
  if (title !== undefined) post.title = title.trim();
  if (content !== undefined) post.content = content.trim();
  if (image !== undefined) post.image = image;

  await post.save();

  // Populate and return updated post
  const populatedPost = await Post.findById(post._id)
    .populate("author", "name email")
    .populate("likes", "name email")
    .populate("comments.user", "name email");
  
  res.json(populatedPost);
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Check ownership/admin rights
  const isOwner = post.author.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted successfully" });
});

// Additional controllers for likes and comments
export const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const userId = req.user._id;
  const alreadyLiked = post.likes.includes(userId);

  if (alreadyLiked) {
    // Unlike the post
    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
  } else {
    // Like the post
    post.likes.push(userId);
  }

  await post.save();
  
  const updatedPost = await Post.findById(post._id)
    .populate("author", "name email")
    .populate("likes", "name email")
    .populate("comments.user", "name email");
  
  res.json(updatedPost);
});

export const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  
  if (!text?.trim()) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.comments.push({
    user: req.user._id,
    text: text.trim()
  });

  await post.save();
  
  const updatedPost = await Post.findById(post._id)
    .populate("author", "name email")
    .populate("likes", "name email")
    .populate("comments.user", "name email");
  
  res.status(201).json(updatedPost);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = post.comments.id(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  // Check if user is comment author or admin
  const isCommentAuthor = comment.user.toString() === req.user._id.toString();
  if (!isCommentAuthor && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  comment.deleteOne();
  await post.save();
  
  const updatedPost = await Post.findById(post._id)
    .populate("author", "name email")
    .populate("likes", "name email")
    .populate("comments.user", "name email");
  
  res.json(updatedPost);
});