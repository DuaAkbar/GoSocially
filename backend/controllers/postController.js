import posts from "../models/Post.js";

export const getAllPost = async (req, res) => {
  try {
    const allPost = await posts.find();
    res.status(200);
    res.json({
      success: true,
      posts: allPost,
      count: allPost.length,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: e.message || "Internal server error!",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { userId,userName , postContent, postImage, postTags, visibility } = req.body;

    if (!userId || !userName || (!postContent && postImage)) {
      res.status(404);
      res.json({
        success: false,
        message: "All fields are requiured!",
      });
      return;
    }

    const newlycreatedPost = await posts.create({
      userId,
      userName,
      ...(postContent && { postContent }),
      ...(postImage && { postImage }),
      ...(postTags && { postTags }),
      ...(visibility && { visibility }),
    });

    res.status(201);
    res.json({
      success: true,
      message: "Post created Successfully!",
      post: newlycreatedPost,
    });
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const updatedPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const postById = await posts.findById(postId);

    if (!postById) {
      res.status(404);
      res.json({
        success: false,
        message: `Post with Id ${postId} does not exists`,
      });
      return;
    }

    const body = req.body;
    const updatedPost = await posts.findByIdAndUpdate(postId, {
      ...(body.postContent && { postContent: body.postContent }),
      ...(body.postImage && { postImage: body.postImage }),
      ...(body.postTags && { postTags: body.postTags }),
      ...(body.visibility && { visibility: body.visibility }),

      isEdited: true,
    });
    res.status(200);
    res.json({
      success: true,
      post: updatedPost,
      message: "Post Updated Successfully",
    });
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const postById = await posts.findById(postId);

    if (!postById) {
      res.status(404);
      res.json({
        success: false,
        message: `Post with Id ${postId} does not exists`,
      });
      return;
    }

    await posts.findByIdAndDelete(postId);
    res.status(200);
    res.json({
      success: true,
      message: "Post Updated Successfully",
    });
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getAllUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const getAllUserPosts = await posts.find({ userId });
    res.status(200);
    res.json({
      success: true,
      posts: getAllUserPosts,
      count: getAllUserPosts.length,
    });
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default { getAllPost, createPost, updatedPost, deletePost  , getAllUserPosts};
