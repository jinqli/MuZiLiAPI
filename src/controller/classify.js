const Classify = require("../model/Classify");

// // 文章分类
async function addClassify(classify = {}) {
  const result = await Classify.create(classify);
  return result;
}

//delete classify
async function delClassify(_id) {
  const result = await Classify.findOneAndRemove({ _id });
  return result;
}

async function updateClassify(_id, classify) {
  const result = await Classify.findOneAndUpdate(
    {
      _id,
    },
    classify
  );
  return result;
}

async function classify() {
  const result = await Classify.find();
  return result;
}

async function getClassifyById(_id) {
  const result = await Classify.findOne({ _id });
  return result;
}

// 前台
async function getClassify() {
  const result = await Classify.find();
  return result;
}

module.exports = {
  addClassify,
  delClassify,
  updateClassify,
  classify,
  getClassifyById,
  getClassify,
};
