import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    lastLogin: { type: Date, default: Date.now},
    isLock: { type: Boolean, default: false },
    isVerify: { type: Boolean, default: false },
    resetPasswordToken: {type : String},
    resetPasswordExpiresAt: {type : Date},
    verificationToken:{ type: String},
    verificationTokenExpiresAt: {type : Date},
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
