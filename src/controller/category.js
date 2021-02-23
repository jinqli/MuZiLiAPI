const Category = require("../model/Category");

// // 文章分类
async function addCategory(category = {}) {
  const result = await Category.create(category);
  return result;
}

//delete Category
async function delCategory(_id) {
  const result = await Category.findOneAndRemove({ _id });
  return result;
}

async function updateCategory(_id, Category) {
  const result = await Category.findOneAndUpdate(
    {
      _id,
    },
    Category
  );
  return result;
}

async function getCategory() {
  const result = await Category.find();
  return result;
}

async function getCategoryById(_id) {
  const result = await Category.findOne({ _id });
  return result;
}

module.exports = {
  addCategory,
  delCategory,
  updateCategory,
  getCategoryById,
  getCategory,
};
