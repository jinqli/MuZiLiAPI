//操作 数据库 leavae_messages
const LeaveMeaasge = require("../model/LeaveMessage");

// 后台管理
// 添加留言
async function addLeaveMessage(leave_message = {}) {
  // 插入数据库
  const newArt = await LeaveMeaasge.create(leave_message);
  // 返回信息
  return newArt;
}

// delete article 后台管理使用
async function delLeaveMeaasge(_id) {
  const result = await LeaveMeaasge.findOneAndRemove({ _id });
  return result;
}

// get leave_message list
async function getLeaveMessageList() {
  const result = await LeaveMeaasge.find();
  return result;
}

module.exports = {
  addLeaveMessage,
  delLeaveMeaasge,
  getLeaveMessageList,
};
