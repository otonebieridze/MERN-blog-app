require("dotenv").config();

const express = require("express");
const path = require('path');
const cors = require("cors");
const blogRoutes = require("./routes/blogs");
const connectDB = require("./config/db");

const expressStatic = require('express').static;

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', expressStatic(path.join(__dirname, 'uploads')));

// routes
app.use("/api/blogs", blogRoutes);

// connect to db
connectDB();

// listen
app.listen(process.env.PORT, () => {
  console.log(
    `App listening on port ${process.env.PORT}`
  );
});
