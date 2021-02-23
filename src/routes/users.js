const router = require("koa-router")();
const { register, login, update, getInfo } = require("../controller/user");
// const jsonwebtoken = require("jsonwebtoken");
// // 解密
// const util = require("util");
// const verify = util.promisify(jsonwebtoken.verify);

router.prefix("/api");

// 注册
router.post("/register", async (ctx, next) => {
  console.log(ctx);
  // 获取注册信息
  const userInfo = ctx.request.body;
  try {
    // 提交注册 成功
    const newUser = await register(userInfo);
    // 返回数据
    ctx.body = {
      errno: 0,
      // data: newUser
    };
  } catch (error) {
    // 失败
    console.error("注册错误：", error);
    // 返回数据
    ctx.body = {
      errno: -1,
      message: "注册失败",
    };
  }
});

// login
router.post("/login", async (ctx, next) => {
  // 获取登录信息
  const { username, password } = ctx.request.body;
  // 验证登录
  const result = await login(username, password);
  // 判断用户名密码是否匹配
  if (result) {
    ctx.body = {
      errno: 0,
      message: "登录成功",
      // token: jsonwebtoken.sign(
      //   { name: username, password }, // 加密userToken
      //   "inkhave",
      //   { expiresIn: "1h" }
      // ),
    };
  } else {
    // error
    ctx.body = {
      errno: -1,
      message: "登录验证失败",
    };
  }
});

// get user info (edit)
router.get("/userList", async (ctx, next) => {
  const users = await getInfo();
  ctx.body = {
    code: 401,
    data: users,
  };
});

// update userInfo api
router.post("/update", async (ctx, next) => {
  // 获取修改后的用户信息
  const updateUser = ctx.request.body;
  // 获取当前修改用户
  const { username } = ctx.session.userInfo;
  // commit data
  const result = await update(updateUser, username);
  if (result) {
    ctx.body = {
      errno: 0,
      message: "修改成功",
    };
  } else {
    ctx.body = {
      errno: -1,
      message: "修改失败",
    };
  }
});

module.exports = router;
