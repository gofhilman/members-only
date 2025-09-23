function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .render("main-layout", {
        page: "unauthorized-access",
        title: "Unauthorized Access",
      });
  }
}

module.exports = isAuth;
