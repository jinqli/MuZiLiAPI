// 连接数据库 npm i --save mongoose

const mongoose = require("mongoose");

// 配置数据库服务
const url = "mongodb://localhost:27017";
const dbName = "blog";

// mongoose 配置
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

// 开始连接
mongoose.connect(`${url}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 实例化连接对象
const conn = mongoose.connection;

conn.on("error", (err) => {
  console.error("mongodb 连接错误：", err);
});

module.exports = mongoose;
