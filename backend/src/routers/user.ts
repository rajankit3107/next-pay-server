import express from "express";
import { Signup } from "../controllers/userController";

const router = express.Router();
router.post("/signup", Signup);

export default router;
