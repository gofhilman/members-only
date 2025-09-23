const { Router } = require("express");
const {
  allPostsGet,
  postFormGet,
  loginFormGet,
  signupFormGet,
  joinFormGet,
  adminFormGet,
  postDeletePost,
  postFormPost,
  loginFormPost,
  signupFormPost,
  joinFormPost,
  adminFormPost,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", allPostsGet);
indexRouter.get("/post", postFormGet);
indexRouter.get("/login", loginFormGet);
indexRouter.get("/signup", signupFormGet);
indexRouter.get("/join", joinFormGet);
indexRouter.get("/admin", adminFormGet);

indexRouter.post("/:postId/delete", postDeletePost);
indexRouter.post("/post", postFormPost);
indexRouter.post("/login", loginFormPost);
indexRouter.post("/signup", signupFormPost);
indexRouter.post("/join", joinFormPost);
indexRouter.post("/admin", adminFormPost);

module.exports = indexRouter;
