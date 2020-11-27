const router = require("koa-router")();
const {
  addClassify,
  delClassify,
  updateClassify,
  classify,
  getClassifyById,
  getClassify,
} = require("../controller/classify");

router.prefix("/api");

router.post("/addClassify", async (ctx, next) => {
  const classify = ctx.request.body;
  try {
    await addClassify(classify);
    ctx.body = {
      errno: 0,
    };
  } catch (error) {
    ctx.body = {
      errno: -1,
    };
  }
});

router.get("/delClassify", async (ctx, next) => {
  const { _id } = ctx.request.query;
  await delClassify(_id);
    ctx.body = {
      errno: 0,
    };
});

router.get("/getClassifyById", async (ctx, next) => {
  const { _id } = ctx.request.query;
  const result = await getClassifyById(_id);
  ctx.body = {
    errno: 0,
    data: result
  }
})

router.post("/updateClassify", async (ctx, next) => {
  const { _id } = ctx.request.body;
  const { ...classify } = ctx.request.body;
  await updateClassify(_id, classify)
  ctx.body = {
    errno: 0
  }
})

router.get("/classify", async (ctx, next) => {
  const result = await classify();
  if (result) {
    ctx.body = {
      errno: 0,
      data: result,
    };
  } else {
    ctx.body = {
      errno: -1,
    };
  }
});

// client
router.get("/getClassify", async (ctx, next) => {
  const result = await getClassify();
  if (result) {
    ctx.body = {
      errno: 0,
      data: result,
    };
  } else {
    ctx.body = {
      errno: -1,
    };
  }
});

module.exports = router;
