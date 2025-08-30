import { Request, Response } from "express";
import { signin, signupBody } from "../validators/validators";
import dotenv from "dotenv";
import { User } from "../models/model";
import jwt from "jsonwebtoken";

dotenv.config();

export const Signup = async (req: Request, res: Response) => {
  try {
    const { success } = signupBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: "Error while signing up",
      });
    }

    const { username, password, lastName, firstName } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: `user already exists` });
    }

    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
    });

    const userId = user._id;

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment variables");
    }

    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );

    return res.json({
      message: `user created successfully`,
      token,
    });
  } catch (error) {
    console.log(`Error while signingUp`, error);
  }
};

export const Signin = async (req: Request, res: Response) => {
  try {
    const { success } = signin.safeParse(req.body);
    // console.log(success);
    if (!success) {
      return res.status(400).json({ message: `Error while signing in` });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    // console.log(user);

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment variables");
    }

    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET
      );

      return res.json({
        token,
      });
    } else {
      return res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(`Error while signingIn`, error);
  }
};
