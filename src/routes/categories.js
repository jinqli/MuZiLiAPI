const router = require("koa-router")();
const {
  addCategory,
  delCategory,
  updateCategory,
  getCategoryById,
  getCategory,
} = require("../controller/category");

router.prefix("/api");

router.post("/addCategory", async (ctx, next) => {
  const Category = ctx.request.body;
  try {
    await addCategory(Category);
    ctx.body = {
      errno: 0,
    };
  } catch (error) {
    ctx.body = {
      errno: -1,
    };
  }
});

router.get("/delCategory", async (ctx, next) => {
  const { _id } = ctx.request.query;
  await delCategory(_id);
  ctx.body = {
    errno: 0,
  };
});

router.get("/getCategoryById", async (ctx, next) => {
  const { _id } = ctx.request.query;
  const result = await getCategoryById(_id);
  ctx.body = {
    errno: 0,
    data: result,
  };
});

router.post("/updateCategory", async (ctx, next) => {
  const { _id } = ctx.request.body;
  const { ...Category } = ctx.request.body;
  await updateCategory(_id, Category);
  ctx.body = {
    errno: 0,
  };
});

router.get("/category", async (ctx, next) => {
  const result = await getCategory();
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
router.get("/getCategory", async (ctx, next) => {
  const result = await getCategory();
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
