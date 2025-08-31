import express from "express";
import { getBalance, transferAmount } from "../controllers/accountController";
import { authMiddleware } from "../middleware/authmiddleware";

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transferAmount);

export default router;
