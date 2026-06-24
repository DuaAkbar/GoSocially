import mongoose from "mongoose";

const commentsSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }, { timestamps: true }
)


export default mongoose.model("Comment", commentsSchema);