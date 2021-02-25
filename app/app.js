// allows us to us data from .env file from @root
const dotenv = require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// routes
const taskRouter = require("@Routes/tasks");
const usersRouter = require("@Routes/users");
const projectsRouter = require("@Routes/projects");
// const { signedCookie } = require("cookie-parser");

// database connection
const database = require("./config/db/database")(
  mongoose,
  process.env.MONGODB_URL
);

// creatin express app
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// enables method override from req send from client
// it allows us to use DELETE, PUT ... etc
app.use(
  methodOverride(function (req) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// enables Cross-Origin Resource Sharing
app.use(cors());
app.options("*", cors());

// app.use(
//   cors({
//     origin: ["*"],
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
//     credentials: true, // enable set cookie
//   })
// );

// enables sessions
app.use(
  session({
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    httpOnly: false,
    secret: process.env.SESSION_SECRET_KEY,
    cookie: {
      maxAge: 1209600,
      sameSite: true,
      secure: process.env.CURRENT_STATE === "production",
    },
  })
);
// adding routers
app.use("/tasks", taskRouter);
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  // console.error(err);
  res.status(err.status || 500).json(err);
});

module.exports = app;
