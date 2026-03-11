import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectMongoDB } from "./config/mongoDB.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

server.use("/api/users", userRoutes); //user routes
server.use("/api/listings", listingRoutes); //listing routes

const port = process.env.PORT;
const startServer = async () => {
  try {
    await connectMongoDB(); //connect to mongodb
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error in startServer!:", error);
    process.exit(1);
  }
};

startServer();
