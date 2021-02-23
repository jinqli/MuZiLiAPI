const router = require("koa-router")();
const {
  addLeaveMessage,
  delLeaveMeaasge,
  getLeaveMessageList,
} = require("../controller/leave_message");

router.prefix("/api");

router.post("/addLeaveMessage", async (ctx, next) => {
  const leave_message = ctx.request.body;
  try {
    await addLeaveMessage(leave_message);
    ctx.body = {
      errno: 0,
      message: "添加成功",
    };
  } catch (error) {
    ctx.body = {
      errno: -1,
      message: "添加失败:" + error,
    };
  }
});

router.get("/delLeaveMessage", async (ctx, next) => {
  const { _id } = ctx.request.query;
  try {
    await delLeaveMeaasge(_id);
    ctx.body = {
      errno: 0,
    };
  } catch (error) {
    ctx.body = {
      errno: -1,
    };
  }
});

router.get("/leaveMessageList", async (ctx, next) => {
  const result = await getLeaveMessageList();
  ctx.body = {
    errno: 0,
    data: result,
  };
});

module.exports = router;
