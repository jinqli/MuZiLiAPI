const router = require("koa-router")(); // 路由
const SQL = require("../utils/sql");
const query = require("../utils/query");
const jwt = require("jsonwebtoken");
const Token = require("../utils/token");
const tbName = "users";
const preUrl = "/api/users";

function register(data) {
  return new Promise((resolve, reject) => {
    query(
      `select * from ${tbName} where email=${data.email}`,
      function (res) {
        if (res.length == 0) {
          query(
            `insert into ${tbName} (username, email, password) values (${data.username}, ${data.email}, ${data.password})`,
            function (res) {
              resolve({
                code: 200,
                message: "注册成功",
              });
            },
            function (err) {
              resolve({
                code: 200,
                message: "注册失败",
                data: err,
              });
            }
          );
        } else {
          resolve({
            code: 200,
            message: "该邮箱已被注册",
          });
        }
      },
      function (err) {
        resolve({
          code: 200,
          message: "请求失败",
          data: err,
        });
      }
    );
  });
}
// signin
function signIn(username, password) {
  return Promise((resolve, reject) => {
    query(
      `select * from ${tbName} where username=${username} and password=${password}`,
      function (res) {
        if (res.length == 0) {
          resolve({
            code: 200,
            message: "用户名密码错误",
          });
        } else {
          const token = jwt.sign({ id: res[0].id }, "token", {
            expiresIn: "15d",
          });
          resolve({
            code: 200,
            message: "登录成功",
            data: {
              username: res[0],
              token,
            },
          });
        }
      },
      function (err) {
        resolve({
          code: 200,
          message: "登录失败",
          data: err,
        });
      }
    );
  });
}

router.post(`${preUrl}/register`, async (ctx, next) => {
  let data = await register(ctx.request.body);
  ctx.body = data;
});
router.post(`${preUrl}/signin`, async (ctx, next) => {
  let result = await signIn(
    ctx.request.body.username,
    ctx.request.body.password
  );
  ctx.body = result;
});
// 获取当前用户信息
router.get(`${preUrl}`, async (ctx, next) => {
  let data = Token.decrypt(ctx.header.authorization);
  if (data.token) {
    let result = await SQL.query(tbName, data.id);
    ctx.body = result;
  } else {
    ctx.body = {
      code: 401,
      message: "failed",
      data,
    };
  }
});
router.post("/api/user/update", async (ctx, next) => {
  let result = await SQL.update(tbName, ctx.request.body.id, ctx.request.body);
  ctx.body = result;
});
router.get("/api/user/delete", async (ctx, next) => {
  let result = await SQL.delete(tbName, ctx.request.query.id);
  ctx.body = result;
});
module.exports = router;
