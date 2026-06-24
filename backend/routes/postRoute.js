import express from "express";
import {
  getAllPost,
  createPost,
  updatedPost,
  deletePost,
  getAllUserPosts,
} from "../controllers/postController.js";

const postRouter = express.Router();
postRouter.get("/get", getAllPost);
postRouter.get("/get-user-posts/:userId", getAllUserPosts)
postRouter.post("/create", createPost);
postRouter.put("/update/:id", updatedPost);
postRouter.delete("/delete/:id", deletePost);

export default postRouter;