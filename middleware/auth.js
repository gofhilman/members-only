function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).render("main-layout", {
      path: req.path,
      page: "login",
      title: "Login",
    });
  }
}

module.exports = isAuth;
