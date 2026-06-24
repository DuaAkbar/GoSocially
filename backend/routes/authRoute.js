import express from "express";
import { checkAuth, CreateUser, loginUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", CreateUser);
authRouter.post("/check-auth", checkAuth);

export default authRouter;