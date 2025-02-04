import PostMessage from "../models/post.model.js";
import mongoose from "mongoose";

// Fetch a Single Post
const fetchPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Invalid post ID");
        error.statusCode = 400;
        throw error;
    }

    const post = await PostMessage.findById(id);
    if (!post) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json(post);
};

// Fetch All Posts with Pagination
const fetchPosts = async (req, res) => {
    const { page = 1 } = req.query;

    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(startIndex);

    res.status(200).json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
    });
};

// Search Posts by Title or Tags
const fetchPostsBySearch = async (req, res) => {
    const { searchQuery = "", tags = "" } = req.query;

    const title = new RegExp(searchQuery, "i");
    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const posts = await PostMessage.find({
        $or: [{ title }, { tags: { $in: tagsArray } }],
    });

    res.status(200).json({ data: posts });
};

// Create a New Post
const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });

    await newPost.save();
    res.status(201).json(newPost);
};

// Update a Post
const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        const error = new Error("Invalid post ID");
        error.statusCode = 400;
        throw error;
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
        _id,
        { ...post, _id },
        { new: true }
    );

    if (!updatedPost) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json(updatedPost);
};

// Delete a Post
const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Invalid post ID");
        error.statusCode = 400;
        throw error;
    }

    const deletedPost = await PostMessage.findByIdAndDelete(id);

    if (!deletedPost) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        message: "Post deleted successfully!",
    });
};

// Like or Unlike a Post
const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        const error = new Error("Unauthenticated");
        error.statusCode = 401;
        throw error;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Invalid post ID");
        error.statusCode = 400;
        throw error;
    }

    const post = await PostMessage.findById(id);

    if (!post) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
    }

    const index = post.likes.findIndex((userId) => userId === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId); // Like the post
    } else {
        post.likes = post.likes.filter((userId) => userId !== String(req.userId)); // Unlike the post
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
};

// Add a Comment to a Post
const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Invalid post ID");
        error.statusCode = 400;
        throw error;
    }

    const post = await PostMessage.findById(id);

    if (!post) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
    }

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
};

export {
    fetchPost,
    fetchPosts,
    fetchPostsBySearch,
    likePost,
    commentPost,
    deletePost,
    updatePost,
    createPost,
};
