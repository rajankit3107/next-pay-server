import { Request, Response } from "express";
import { signupBody } from "../validators/validators";
import dotenv from "dotenv";
import { User } from "../models/model";
import jwt from "jsonwebtoken";

dotenv.config();

export const Signup = async (req: Request, res: Response) => {
  try {
    const { success } = signupBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: "Email already taken or Incorrect inputs",
      });
    }

    const { username, password, lastName, firstName } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.status(400).json({ message: `user already exists` });

    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
    });

    const userId = user._id;

    if (!process.env.JWT_SECRET)
      throw new Error("JWT_SECRET is not set in environment variables");

    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );

    res.json({
      message: `user created successfully`,
      token,
    });
  } catch (error) {}
};
