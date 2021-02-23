const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
// koa2-cors 跨域资源共享 未安装
const cors = require("koa2-cors");
// jwt验证
const koajwt = require("koa-jwt");

// router
const index = require("./routes/index");
const users = require("./routes/users");
const articles = require("./routes/articles");
const categories = require("./routes/categories");
const leave_message = require("./routes/leave_message");

// error handler
onerror(app);

// 中间件对token进行验证
// app.use(async (ctx, next) => {
//   return next().catch((err) => {
//     if (err.status === 401) {
//       ctx.status = 401;
//       ctx.body = {
//         code: 401,
//         msg: err.message,
//       };
//     } else {
//       throw err;
//     }
//   });
// });

const SECRET = "shared-secret"; // demo，可更换

// app.use(
//   koajwt({ secret: SECRET }).unless({
//     // 登录接口不需要验证
//     path: [/^\/api\/login/, /^\/api\/register/, /^\/api\/index/],
//   })
// );

// 服务端支持跨域
app.use(
  cors({
    // origin: "http://localhost:3000", // 支持前端哪个域，可以跨域
    origin: "*",
  })
);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(articles.routes(), articles.allowedMethods());
app.use(categories.routes(), categories.allowedMethods());
app.use(leave_message.routes(), leave_message.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
