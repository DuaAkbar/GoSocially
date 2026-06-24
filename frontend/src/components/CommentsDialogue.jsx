import axios from "axios";
import React, { useState } from "react";
import { getUserInitials } from "../../utils/utility";

function CommentsDialog({ isOpen, onClose, postId, comments, fetchComments, isCommentsLoading }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const body = {
      postId: postId,
      userName: userName,
      userId: userId,
      comment: newComment,
    };

    const response = await axios.post("http://localhost:5000/api/v1/comments/add-comments", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNewComment("");
    fetchComments();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Dialog Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Comments {!isCommentsLoading && `(${comments.length})`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isCommentsLoading ? (
            <>
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </>
          ) : (
            <>
              {comments.map((comment) => (
                <div key={comment._id} className="flex space-x-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {getUserInitials(comment.userName)}
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{comment.userName}</h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <form onSubmit={handleSubmitComment} className="flex space-x-3">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getUserInitials(localStorage.getItem("userName"))}
              </div>
            </div>

            {/* Input Field */}
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentsDialog;