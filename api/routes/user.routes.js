import express from "express";
import {
  deleteUser,
  getUserListings,
  test,
  updateUser,
  getUser,
  getAllUser,
  deleteUserbyAdmin
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);

router.get("/getallusers/:id", verifyToken, getAllUser);
router.delete("/deleteusers/:id", deleteUserbyAdmin);


export default router;
