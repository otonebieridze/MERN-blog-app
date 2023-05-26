const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

// GET all blogs
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });

  res.status(200).json(blogs);
};

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
};

// CREATE a new blog
const createBlog = (req, res) => {
  const { title, author, description, category } = req.body;
  let newBlog = [];

  if (req.file) {
    const { filename, path: filePath } = req.file;
    newBlog = new Blog({
      title,
      author,
      description,
      category,
      image: filename,
      filePath,
    });
  } else {
    newBlog = new Blog({
      title,
      author,
      description,
      category,
    });
  }
  newBlog
    .save()
    .then(() => {
      res.json({ message: "Blog added successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// DELETE a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const blog = await Blog.findOneAndDelete({ _id: id });

  if (!blog) {
    return res.status(404).json({ message: "Invalid id" });
  }

  res.status(200).json(blog);
};

//UPDATE a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const { ...otherData } = req.body;
  let updatedData = {};

  if (req.file) {
    updatedData = {
      image: req.file.filename,
      filePath: req.file.path,
      ...otherData,
    };
  } else {
    updatedData = {
      ...otherData,
    };
  }

  try {
    const blog = await Blog.findOneAndUpdate({ _id: id }, updatedData, { new: true }).exec();

    if (!blog) {
      return res.status(404).json({ message: "Invalid id" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
