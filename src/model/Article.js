// Articles Schema Model
const mongoose = require("../db/db");

const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  classify: {
    type: String,
    required: true,
  },
  tag: {
    type: Array,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updateAt: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model("article", ArticleSchema);

module.exports = Article;
