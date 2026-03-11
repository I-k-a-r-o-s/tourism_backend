import { Router } from "express";
import {
  addListItem,
  deleteListing,
  getAllListings,
  getListingsByID,
  updateListing,
} from "../controllers/listingController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const listingRoutes = Router();

listingRoutes.post("/create", protectedRoute, addListItem); //create a new listing
listingRoutes.get("/getlisting/:id", getListingsByID); //get listing by id
listingRoutes.get("/getalllistings", getAllListings); //get all listings
listingRoutes.put("/update/:id", protectedRoute, updateListing); //update listing by id
listingRoutes.delete("/delete/:id", protectedRoute, deleteListing); //delete listing by id

export default listingRoutes;
