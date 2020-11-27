// 登录验证中间件 通过session有无值来判断

async function loginCheck(ctx, next) {
  console.log(ctx.session.openId);
  if (ctx.session.openId) {
    // 登录验证通过
    await next();
  } else {
    // 登录验证失败
    ctx.body = {
      isLogin: -1,
    };
  }
}

module.exports = loginCheck;
