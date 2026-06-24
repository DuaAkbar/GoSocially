import Comments from "../models/Comments.js";

export const getAllCommentsByPosts = async (req, res) => {
  try {
    const postId = req.params.postId;
    const findComments = await Comments.find({ postId });
    res.status(200);
    res.json({
      success: true,
      comments: findComments,
      count: findComments.length,
    });
  } catch (e) {
    res.status(500);
      res.json({
        message: "Internal Server error!",
      });
  }
};

export const deleteAllCommentsByPost = async (req, res) => {
  try {
    const id = req.params.id;
    const commentsTobeDeleted = await Comments.findById(id);

    if (commentsTobeDeleted == null) {
      res.status(404);
      res.json({
        success: false,
        message: `Comments not found By id ${id}`,
      });
      return;
    }

    await Comments.findByIdAndDelete(id);

    res.status(200);
    res.json({
      success: true,
      message: `Comment with Id ${id} has been Deleted Successfully! `,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: e.message || `Internal Server error!`,
    });
  }
};

export const createComments = async (req, res) => {
  try {
    const { postId, userId, userName, comment } = req.body;
    if (!postId || !userId || !userName || !comment) {
      res.status(404);
      res.json({
        success: false,
        message: "All Fields are Required!",
      });
      return;
    }
    const newComments = await Comments.create({
      postId,
      userId,
      userName,
      comment,
    });

    res.status(201);
    res.json({
      success: true,
      message: "Comments create Successfully!",
      comments: newComments,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: e.message || `Internal Server error!`,
    });
  }
};
