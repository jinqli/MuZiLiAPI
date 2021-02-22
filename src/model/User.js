// 规范数据结构 Schema

const mongoose = require("../db/db");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phpto: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
