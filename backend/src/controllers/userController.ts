import { Request, Response } from "express";
import { signinBody, signupBody, updateBody } from "../validators/validators";
import dotenv from "dotenv";
import { Account, User } from "../models/model";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

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

    //create an account for the user

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

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
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const Signin = async (req: Request, res: Response) => {
  try {
    const { success } = signinBody.safeParse(req.body);
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
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const Update = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { success } = updateBody.safeParse(req.body);
    console.log(success);

    if (!success) {
      return res
        .status(400)
        .json({ message: `Error while updating information` });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const result = await User.updateOne(
      {
        _id: req.userId,
      },
      req.body
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User updated successfully" });
  } catch (error) {
    console.log("Error while updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Filter = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { firstName, lastName } = req.query;

    // Build the search query
    const searchQuery: any = {};

    if (firstName && typeof firstName === "string" && firstName.trim() !== "") {
      searchQuery.firstName = {
        $regex: firstName.trim(),
        $options: "i", // Case insensitive search
      };
    }

    if (lastName && typeof lastName === "string" && lastName.trim() !== "") {
      searchQuery.lastName = {
        $regex: lastName.trim(),
        $options: "i", // Case insensitive search
      };
    }

    // If no search parameters provided, return all users
    if (Object.keys(searchQuery).length === 0) {
      const allUsers = await User.find({});
      return res.json({
        users: allUsers.map((user) => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        })),
      });
    }

    const users = await User.find(searchQuery);

    return res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
    });
  } catch (error) {
    console.log("Error while filtering users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
