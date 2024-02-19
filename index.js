import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./api/routes/user.routes.js";
import authRouter from "./api/routes/auth.route.js";
import listingRouter from "./api/routes/listing.route.js";
import postRouter from "./api/routes/post.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
const mongo = process.env.MONGO;
mongoose.connect(mongo, {});

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log(`Monogo Database is connected  on port ${mongo}`);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/post", postRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
