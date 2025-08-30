import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: `unauthorized request` });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: `unauthorized request` });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(403).json({ message: `unauthorized request` });
  }
};
