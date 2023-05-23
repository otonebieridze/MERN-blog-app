const express = require("express");
const {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  deleteBlog,
  updateBlog
} = require("../controllers/blogController");

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// GET all blogs
router.get("/", getAllBlogs);

// GET a single blog
router.get("/:id", getSingleBlog);

// POST a new blog
router.post("/", createBlog);

// DELETE a blog
router.delete("/:id", deleteBlog);

// UPDATE a blog
router.patch("/:id", updateBlog);

module.exports = router;
