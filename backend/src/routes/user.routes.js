import express from "express";
import { getStats, getActivity } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/stats", authMiddleware, getStats);
userRoutes.get("/activity", authMiddleware, getActivity);

export default userRoutes;
