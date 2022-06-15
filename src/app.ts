import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import createError, { HttpError } from "http-errors";
import express, { NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from 'helmet';
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize"

import indexRouter from "./routes/index";
import usersRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import productRouter from "./routes/productRoutes";
import transactionRouter from "./routes/transactionRoute";
import purchaseRouter from "./routes/purchaseRoutes";
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/purchase", purchaseRouter);
app.use("/api/v1/transactions", transactionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
