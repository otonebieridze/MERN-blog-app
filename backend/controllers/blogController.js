const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

// GET all blogs
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({createdAt: -1});

  res.status(200).json(blogs);
}

// GET a single blog
const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
}

// CREATE a new blog
const createBlog = async (req, res) => {
  const { title, author, description, image, category } = req.body;

  try {
    const blog = await Blog.create({ title, author, description, image, category });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// DELETE a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const blog = await Blog.findOneAndDelete({_id: id});

  if (!blog) {
    return res.status(404).json({ message: "Invalid id" });
  }

  res.status(200).json(blog);
}

// UPDATE a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const blog = await Blog.findOneAndUpdate({_id: id}, {
    ...req.body
  }, {new: true});

  if (!blog) {
    return res.status(404).json({ message: "Invalid id" });
  }

  res.status(200).json(blog);
}


module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  deleteBlog,
  updateBlog
}