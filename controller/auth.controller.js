import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateToken } from "./../utils/generateToken.js";
import { checkValidGmail } from "../utils/utilsEmail.js";
import {
  sendVerificationEmail,
  sendWellcomeEmail,
  sendEmailResetPassword,
  sendEmailSuccessResetPassword,
} from "../utils/emailService/emailService.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(403).json({ code: 4, msg: "Bad Request" });
    }
    if (!checkValidGmail(email)) {
      return res.status(403).json({ code: 4, msg: "Email Not Valid" });
    }
    const userAlreadyExists = await User.findOne({ email: email });
    if (userAlreadyExists) {
      return res.status(400).json({ code: 4, msg: "Email already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationCode();
    const user = new User({
      email: email,
      password: hashedPassword,
      username: name,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    await sendVerificationEmail(user.email, verificationToken);
    await user.save();
    return res.status(200).json({ code: 0, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code, email } = req.body;
  try {
    const user = await User.findOne({
      email: email,
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(403)
        .json({ code: 4, msg: "Invalid Verification Code" });
    }
    user.isVerify = true;
    await user.save();
    await sendWellcomeEmail(user.email);
    return res.status(200).json({ code: 0, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ code: 4, msg: "User not found" });
    }
    const isPassswordValid = await bcryptjs.compare(password, user.password);
    if (!isPassswordValid) {
      return res.status(403).json({ code: 4, msg: "Invalid credentials" });
    }
    user.lastLogin = new Date();
    await user.save();
    const token = generateToken(user._id);
    const age = 1000 * 60 * 60 * 24 * 7;
    return res
      .cookie("Authorization", token, {
        httpOnly: true,
        maxAge: age,
        secure: true, // https
        sameSite: "None",
      })
      .status(200)
      .json({ code: 0, msg: "Success", user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};

export const logout = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ code: 4, msg: "Not Found User" });
    }
    res.clearCookie("Authorization", {
      path: "/",
      domain: "datn-be-zrcv.onrender.com",
      sameSite: "None",
      secure: true,
    });
    res.clearCookie("Authorization");
    return res.status(200).json({ code: 0, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ code: 4, msg: "User not found" });
    }
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000; // 10 minutes
    await user.save();
    await sendEmailResetPassword(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );
    return res.status(200).json({ code: 0, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, email } = req.body;
  try {
    const user = await User.findOne({
      email: email,
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if(!user){
      return res.status(404).json({ code: 4, msg: "Invalid or expired reset token" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiresAt = null;
    await user.save();
    await sendEmailSuccessResetPassword(user.email)
    return res.status(200).json({ code: 0, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req.userId.userId
    const user = await User.findOne({_id : userId})
    if(!user){
      return res.status(401).json({ code: 4, msg: "User Not Found" });
    }
    return res.status(200).json({ code: 0, msg: "Success", user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
}
