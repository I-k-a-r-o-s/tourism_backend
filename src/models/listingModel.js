import { Schema } from "mongoose";

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image:{
        type: String,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likesCount:{
        type: Number,
        default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const Listing = model("Listing", listingSchema);

export default Listing;
