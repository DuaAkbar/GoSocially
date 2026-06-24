import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postContent: {
    type: String,
    trime: true,
  },
  postImage: {
    type: String,
  },
  postTags: [
    {
      type: [],
    },
  ],
  isEdited: {
    type: Boolean,
    default: false,
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  userName: {
            type: String,
            required: true
        },
},
{timestamps:true}
);

export default mongoose.model("Posts" , postSchema);
