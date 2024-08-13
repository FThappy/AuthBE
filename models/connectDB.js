import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`DBConnection Successfull`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
