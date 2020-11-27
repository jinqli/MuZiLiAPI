const router = require("koa-router")();

router.get("/api", async (ctx, next) => {
  ctx.body =
    "<h1 style='text-align:center;margin-top:100px'>一叶知秋API</h1> <script>document.title='一叶知秋'</script>";
});

module.exports = router;
