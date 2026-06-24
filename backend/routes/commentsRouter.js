import express from "express";

import { createComments, deleteAllCommentsByPost, getAllCommentsByPosts } from "../controllers/commentsController.js";

const commentsRouter = express.Router();

commentsRouter.get("/get-comments-by-post/:postId" , getAllCommentsByPosts);
commentsRouter.delete("/delete-comments-by-post/:id" , deleteAllCommentsByPost);
commentsRouter.post("/add-comments" , createComments);

export default commentsRouter;