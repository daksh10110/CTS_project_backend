var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("express-async-errors");
var cors = require("cors");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var adminRouter = require("./routes/admin")
const {
    tokenExtractor,
    tokenValidator,
    errorHandler,
    adminValidator
} = require("./utils/middleware");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/auth", authRouter);

app.use(tokenExtractor);
app.use(tokenValidator);

app.use("/user", usersRouter);

app.use(adminValidator);
app.use("/admin", adminRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(errorHandler);

module.exports = app;
