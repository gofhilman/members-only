const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/");
indexRouter.get("/login");
indexRouter.get("/signup");
indexRouter.get("/join");
indexRouter.get("/admin");

indexRouter.post("/:postId/delete");
indexRouter.post("/login");
indexRouter.post("/signup");
indexRouter.post("/join");
indexRouter.post("/admin");

module.exports = indexRouter;
