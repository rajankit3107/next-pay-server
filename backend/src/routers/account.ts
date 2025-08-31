import express from "express";
import { transferAmount } from "../controllers/accountController";
import { authMiddleware } from "../middleware/authmiddleware";

const router = express.Router();

router.post("/transfer", authMiddleware, transferAmount);

export default router;
