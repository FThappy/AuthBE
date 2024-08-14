import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateToken } from "./../utils/generateToken.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(403).json({ code: 4, msg: "Bad Request" });
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
      name: name,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    const token = generateToken();

    const age = 1000 * 60 * 60 * 24 * 7;

    return res
      .cookie("Authorization", token, {
        httpOnly: true,
        maxAge: age,
        secure: true, // https
        sameSite: "None",
      })
      .status(200)
      .json({ code: 0, msg: "Success", user : user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};

export const login = async (req, res) => {
  try {
    return res.status(200).json({ code: 0, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).json({ code: 0, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 4, msg: "Failed" });
  }
};
