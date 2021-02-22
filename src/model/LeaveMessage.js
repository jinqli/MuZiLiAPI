// 规范数据结构 Schema

const mongoose = require("../db/db");

const LeaveMessageSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LeaveMeaasge = mongoose.model("leave_message", LeaveMessageSchema);

module.exports = LeaveMeaasge;
