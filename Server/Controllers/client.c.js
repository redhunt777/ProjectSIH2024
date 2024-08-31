import Client from "../models/client.m.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const registerClient = async (req, res) => {
  try {
    const { name, email, phone, password, publicAddress, mnemonics } = req.body;
    // Basic validation (add more comprehensive validation as needed)
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !publicAddress ||
      !mnemonics
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    // Check if the user already exists
    const existingClient = await Client.findOne({ email: email });
    if (existingClient) {
      return res
        .status(409)
        .json({ status: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new client
    const newClient = new Client({
      name,
      email,
      phone,
      hashedPassword,
      publicAddress,
      mnemonics,
    });

    // Save the new client
    await newClient.save();

    // Send a success response
    res.status(201).json({
      status: true,
      message: "You have been registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Basic validation (add more comprehensive validation as needed)
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    const existingClient = await Client.findOne({ email: email });
    if (!existingClient) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingClient.hashedPassword
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingClient.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/", // Cookie will be sent for all routes
      })
      .json({ status: true, message: "Login successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
