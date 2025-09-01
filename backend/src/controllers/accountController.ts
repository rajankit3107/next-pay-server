import { Request, Response } from "express";
import mongoose from "mongoose";
import { Account } from "../models/model";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const getBalance = async (req: AuthenticatedRequest, res: Response) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  return res.json({
    balance: account?.balance,
  });
};

export const transferAmount = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const session = await mongoose.startSession();
``
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { amount, to } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (!to) {
      return res.status(400).json({ message: "Recipient ID is required" });
    }

    if (req.userId === to) {
      return res.status(400).json({ message: "Cannot transfer to yourself" });
    }

    session.startTransaction();

    // Fetch the sender's account within transaction
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Sender account not found" });
    }

    if (account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Fetch the recipient's account within transaction
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Recipient account not found" });
    }

    // Perform the transaction
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    return res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.log("Error in transferAmount:", error);
    await session.abortTransaction();
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
};
