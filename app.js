var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

var indexRouter = require("./routes/index");
const mailsRouter = require("./components/mails/mailRoutes");
const usersRouter = require("./components/users/userRoutes");
const authRouter = require("./components/authentication/authRoutes");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to database");
  }
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/mail", mailsRouter);
app.use("/login", authRouter);

module.exports = app;
