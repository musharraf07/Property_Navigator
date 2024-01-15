import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// const mongoose = require("mongoose");

dotenv.config();
const mongo = process.env.MONGO;
mongoose.connect(mongo, {});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log(`Database is connected  on port ${mongo}`);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
const app = express();
