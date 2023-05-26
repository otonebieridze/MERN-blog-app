const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    require: true
  },
  image: {
    type: String
  },
  filePath: {
    type: String
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema);
