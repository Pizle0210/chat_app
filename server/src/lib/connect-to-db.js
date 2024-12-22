import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB_URI:", process.env.MONGODB_URI);
    console.log(
      `has successfully connected to database: ${connect.connection.host} `
    );
  } catch (error) {
    console.log(`error encountered while connecting to database,${error}`);
  } 
};
