import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function ConnectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error(`MONGO_URI is not defined in the enviroment variables`);
    process.exit(1);
  }
  try {
    await mongoose.connect(mongoUri);
    console.log(`Database Up Successfully ✅ `);
  } catch (error) {
    console.error(`Error connecting to database ❌:`, error);
    process.exit(1);
  }
}

export default ConnectDB;
