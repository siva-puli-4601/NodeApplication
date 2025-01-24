import mongoo from "mongoose";
import { DB_NAME } from "../constants.js";

// Connect to MongoDB
const connectDB = async () => {
  try {

    const connectionDb=await mongoo.connect(`${process.env.DB_URI}/${DB_NAME}`);
    console.log("database connection",connectionDb.connection.host);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export {connectDB}