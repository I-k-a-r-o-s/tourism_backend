import Listing from "../models/listingModel";

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
