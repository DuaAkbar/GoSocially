import express from "express";
import { userUpdate, userPasswordUpdate } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.put("/update/:userId", userUpdate);
profileRouter.put("/update-password/:userId", userPasswordUpdate);

export default profileRouter;