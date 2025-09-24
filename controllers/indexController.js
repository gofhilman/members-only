const bcrypt = require("bcryptjs");
const passport = require("passport");
const {
  getAllPosts,
  deletePost,
  insertPost,
  insertUser,
  updateMember,
  updateAdmin,
} = require("../db/queries");
const { validationResult } = require("express-validator");

async function allPostsGet(req, res) {
  const posts = await getAllPosts();
  res.render("main-layout", {
    posts,
    user: req.user,
    page: "index",
    title: "Home",
  });
}

function aboutGet(_, res) {
  res.render("main-layout", {
    page: "about",
    title: "About",
  });
}

function postFormGet(_, res) {
  res.render("main-layout", {
    page: "post",
    title: "Create a new post",
  });
}

function loginFormGet(_, res) {
  res.render("main-layout", { page: "login", title: "Login" });
}

function signupFormGet(_, res) {
  res.render("main-layout", {
    page: "signup",
    title: "Signup",
  });
}

function joinFormGet(_, res) {
  res.render("main-layout", {
    page: "join",
    title: "Become a member",
  });
}

function adminFormGet(_, res) {
  res.render("main-layout", {
    page: "admin",
    title: "Become an admin",
  });
}

async function postDeletePost(req, res) {
  const { postId } = req.params;
  await deletePost(postId);
  res.redirect("/");
}

async function postFormPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("main-layout", {
      page: "post",
      title: "Create a new post",
      errors: errors.array(),
    });
  }
  const { title, content } = req.body;
  await insertPost(title, content, req.user.id);
  res.redirect("/");
}

function loginFormPost(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("main-layout", {
      page: "login",
      title: "Login",
      errors: errors.array(),
    });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render("main-layout", {
        page: "login",
        title: "Login",
        message: info?.message || "Login failed",
      });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
}

async function signupFormPost(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("main-layout", {
      page: "signup",
      title: "Signup",
      errors: errors.array(),
    });
  }
  try {
    const { fullname, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await insertUser(fullname, username, hashedPassword);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

async function joinFormPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("main-layout", {
      page: "join",
      title: "Become a member",
      errors: errors.array(),
    });
  }
  await updateMember(req.user.id);
  res.redirect("/");
}

async function adminFormPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("main-layout", {
      page: "admin",
      title: "Become an admin",
      errors: errors.array(),
    });
  }
  await updateAdmin(req.user.id);
  res.redirect("/");
}

module.exports = {
  allPostsGet,
  aboutGet,
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
};
