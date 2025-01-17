import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

mongoose.set("strictQuery", false);
const connectDB = async() => {
   try {
       const mongodbinstanceconnection = await mongoose.connect(`${process.env.MONGODB_URL}`);
       console.log(`Connected to Mongodb Successfully: ${mongodbinstanceconnection.connection.host}`);
   } catch (error) {
       console.log("MONGODB connection error..", error);
   }
    
}

export { connectDB };