require("dotenv").config();

const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogs");

const expressStatic = require('express').static;

const app = express();

// middleware
app.use(express.json());
// app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/uploads', expressStatic(path.join(__dirname, 'uploads')));

// routes
app.use("/api/blogs", blogRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `App connected to db & listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
