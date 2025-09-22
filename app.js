require("dotenv").config();
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const PgStore = require("connect-pg-simple")(session);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const sessionStore = new PgStore({});

app.use((err, _, res, __) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${PORT}`);
});
