// Articles Schema Model
const mongoose = require("../db/db");

const ArticleSchema = mongoose.Schema({
  username: {
    type: String,
  },
  user_id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  imgUrl: {
    type: String,
    deault:
      "https://desk-fd.zol-img.com.cn/t_s208x130c5/g6/M00/03/05/ChMkKmAd-R-IGbg9AAmT2xHAEmcAAJfgwPApwUACZPz463.jpg",
  },
  content: {
    type: String,
    required: true,
  },
  category: {
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
  updatedAt: {
    type: String,
  },
});

const Article = mongoose.model("article", ArticleSchema);

module.exports = Article;
