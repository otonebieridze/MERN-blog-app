const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("App connected to db");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
