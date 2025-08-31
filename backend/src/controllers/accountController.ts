import dotenv from "dotenv";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

dotenv.config();
