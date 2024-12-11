import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `has successfully connected to database: ${connect.connection.host} `
    );
  } catch (error) {
    console.log(`error encountered while connecting to database,${error}`);
  } 
};
