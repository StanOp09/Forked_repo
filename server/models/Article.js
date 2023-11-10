const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  outline: {
    type: String,
    required: false,
  },
  createdArticles: {
    type: String,
    required: true,
  },
  createdPosts: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
