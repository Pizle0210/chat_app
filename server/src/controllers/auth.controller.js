import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwt.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      res
        .status(400)
        .json({ message: `Please check that all fields are filled` });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword
    });

    if (newUser) {
      // generate jwt
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic
      });
    } else {
      res.status(400).json({ message: `Invalid user data` });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: `Internal server error` });
    }
    console.log(`Error signing you up`);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: `Invalid credentials` });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: `invalid credentials` });

    generateToken(existingUser._id, res);

    res.status(200).json({
      _id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      profilePic: existingUser.profilePic
    });
  } catch (error) {
    console.log(`Error signing you up`);
    res.status(500).json({ message: `Internal server error` });
  }
};

export const signout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0
    });
    res.status(200).json({ masyncessage: `Signed out successfully` });
  } catch (error) {
    console.log(`Error signing out`);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    !profilePic && res.status(400).json({ message: `Profile pic is required` });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findById(
      userId,
      {
        profilePic: uploadResponse.secure_url
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`Error updating profile`);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

// const authRateLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: "Too many requests, please try again later."
// });

export const checkAuth = (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "User not authenticated" });
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ message: error.message });
  }
};
  