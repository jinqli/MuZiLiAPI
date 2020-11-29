//操作 数据库 articles
const Article = require("../model/Article");

// 后台管理
// 添加文章
async function addArticle(article = {}) {
  // 插入数据库
  const newArt = await Article.create(article);
  // 返回文章信息
  return newArt;
}

// update article
async function updateArticle(_id, article) {
  const result = await Article.findOneAndUpdate(
    { _id },
    { ...article },
    {
      new: true,
    }
  );
  return result;
}

// delete article
async function delArticle(_id) {
  const result = await Article.findOneAndRemove({ _id });
  return result;
}

// get article list
async function articleList() {
  const articles = await Article.find();
  return articles;
}

// get article by id
async function getArticleById(_id) {
  const result = await Article.findOne({ _id });
  return result;
}

// 前台展示
// all article
async function getArtList() {
  const result = await Article.find();
  return result;
}

// article detail
async function getArtById(_id) {
  const result = await Article.findOne({ _id });
  return result;
}

// get article by classify
async function getArtByClassify(classify) {
  const result = await Article.find({ classify });
  return result;
}

module.exports = {
  addArticle,
  updateArticle,
  delArticle,
  articleList,
  getArticleById,
  getArtList,
  getArtById,
  getArtByClassify,
};
