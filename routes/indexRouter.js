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
  aboutGet,
} = require("../controllers/indexController");
const {
  validatePost,
  validateLogin,
  validateSignup,
  validateJoin,
  validateAdmin,
} = require("../middleware/formValidation");
const isAuth = require("../middleware/auth");

const indexRouter = Router();

indexRouter.get("/", allPostsGet);
indexRouter.get("/about", aboutGet);
indexRouter.get("/post", isAuth, postFormGet);
indexRouter.get("/login", loginFormGet);
indexRouter.get("/signup", signupFormGet);
indexRouter.get("/join", isAuth, joinFormGet);
indexRouter.get("/admin", isAuth, adminFormGet);

indexRouter.post("/:postId/delete", postDeletePost);
indexRouter.post("/post", validatePost, postFormPost);
indexRouter.post("/login", validateLogin, loginFormPost);
indexRouter.post("/signup", validateSignup, signupFormPost);
indexRouter.post("/join", validateJoin, joinFormPost);
indexRouter.post("/admin", validateAdmin, adminFormPost);

module.exports = indexRouter;
