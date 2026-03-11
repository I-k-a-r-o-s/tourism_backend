import Listing from "../models/listingModel.js";

export const addListItem = async (req, res) => {
  try {
    const { id } = req.user;
    const {
      title,
      location,
      image,
      shortDescription,
      fullDescription,
      price,
      likesCount,
    } = req.body;

    if (
      !title ||
      !location ||
      !image ||
      !shortDescription ||
      !fullDescription
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields!",
      });
    }

    const existingListing = await Listing.findOne({ location });
    if (existingListing) {
      return res.status(400).json({
        success: false,
        message: "A listing with this location already exists!",
      });
    }

    const listing = await Listing.create({
      title,
      location,
      image,
      shortDescription,
      fullDescription,
      price,
      user: id,
      likesCount,
    });
    return res.status(201).json({
      success: true,
      message: "Listing created successfully!",
      listing,
    });
  } catch (error) {
    console.error("Error in addListItem!:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getListingsByID = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id)
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Listing retrieved successfully!",
      listing,
    });
  } catch (error) {
    console.error("Error in getListingsByID!:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All listings retrieved successfully!",
      listings,
    });
  } catch (error) {
    console.error("Error in getAllListings!:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, image, shortDescription, fullDescription, price } =
      req.body;

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found!",
      });
    }
    listing.title = title || listing.title;
    listing.location = location || listing.location;
    listing.image = image || listing.image;
    listing.shortDescription = shortDescription || listing.shortDescription;
    listing.fullDescription = fullDescription || listing.fullDescription;
    listing.price = price !== undefined ? price : listing.price;

    await listing.save();
    return res.status(200).json({
      success: true,
      message: "Listing updated successfully!",
      listing,
    });
  } catch (error) {
    console.error("Error in updateListing!:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully!",
    });
  } catch (error) {
    console.error("Error in deleteListing!:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
