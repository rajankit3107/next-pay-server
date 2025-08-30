import express from "express";
import { Filter, Signin, Signup, Update } from "../controllers/userController";
import { authMiddleware } from "../middleware/authmiddleware";

const router = express.Router();
router.post("/signup", Signup);
router.post("/signin", Signin);
router.put("/update", authMiddleware, Update);
router.get("/bulk", authMiddleware, Filter);

export default router;
