const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
// koa2-cors 跨域资源共享 未安装
const cors = require("koa2-cors");
const session = require("koa-generic-session");
const mount = require("koa-mount");

const index = require("./routes/index");
const users = require("./routes/users");
const articles = require("./routes/articles");
const categories = require("./routes/categories");

// error handler
onerror(app);

// 服务端支持跨域
app.use(
  cors({
    origin: "http://localhost:3000", // 支持前端哪个域，可以跨域
    // origin: "*",
    credentials: true, // 允许跨域的时候带着 cookie
  })
);

// 配置session
app.keys = ["have^ink&121@LJQ"];
app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 24 * 60 * 1000, // 一天
    },
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

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
