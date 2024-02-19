import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  deleteListingByAdmin,
  getContacts,
  deletecontactByAmin,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.delete("/deletebyadmin/:id", deleteListingByAdmin);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);
router.get("/getcontacts", getContacts);
router.delete("/deletecontact/:id", deletecontactByAmin);

export default router;
