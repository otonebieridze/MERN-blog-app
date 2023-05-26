const express = require("express");
const {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  deleteBlog,
  updateBlog
} = require("../controllers/blogController");

const router = express.Router();

const multer = require("multer");
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET all blogs
router.get("/", getAllBlogs);

// GET a single blog
router.get("/:id", getSingleBlog);

// POST a new blog
router.post("/", upload.single("image"), createBlog);

// DELETE a blog
router.delete("/:id", deleteBlog);

// UPDATE a blog
router.patch("/:id", upload.single("image"), updateBlog);

module.exports = router;
