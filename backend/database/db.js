import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = () => {
  const URL = process.env.MONGODB_URL;

  mongoose
    .connect(URL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log("Error while connecting with database", error.message);
    });
};

export default Connection;
