require("dotenv").config();
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const PgStore = require("connect-pg-simple")(session);
const pool = require("./db/pool");
const passport = require("passport");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const sessionStore = new PgStore({
  pool: pool,
  createTableIfMissing: true,
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 14 * 24 * 3600 * 1000,
    },
  })
);

require("./config/passport");
app.use(passport.session());

app.use((err, _, res, __) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${PORT}`);
});
