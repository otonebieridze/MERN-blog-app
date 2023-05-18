require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogs");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/blogs", blogRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`App connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
