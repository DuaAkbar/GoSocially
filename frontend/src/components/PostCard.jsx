import axios from "axios";
import React, { useContext, useState } from "react";
import CommentsDialog from "./CommentsDialogue";
import { getUserInitials } from "../../utils/utility";
import moment from "moment";
import UpdatePostDialog from "./updatePostDialogue";
import DeleteConfirmationDialog from "./DeleteDialog";
import { SocialMediaState } from "../../context/SocialMediaContext";

function PostCard({ postData, myposts = false, fetchPosts }) {

  const {handleOnDelete} = useContext(SocialMediaState);

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);


  const token = localStorage.getItem("token");


  const {
    imageLoading,
    postImage,
    postContent,
    setPostContent,
    postTags,
    SetpostTags,
    Setvisibility,
    handleOnImageChange,
    handleOnPostCreated,
    SetpostImage
  } = useContext(SocialMediaState);
  

  const handleOnDialogueOpenEdit = () => {
    setIsEditOpen(true);
    console.log(postData);

    Setvisibility(postData.visibility);
    setPostContent(postData.postContent);
    SetpostTags(`#${postData?.postTags?.join("#")}`);
    SetpostImage(postData.postImage || "");
  };

  const handleOnDialogueOpen = () => {
    setIsCommentsOpen(true);
    fetchComments();
  };

  const fetchComments = async () => {
    try {
      setIsCommentsLoading(true);
      const { data } = await axios.get(
        `https://gosocially-production.up.railway.app/api/v1/comments/get-comments-by-post/${postData?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(data.comments);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  return (
    <>
      {/* Post Card */}
      <article className="mt-4 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {/* Post Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              {getUserInitials(postData.userName ?? "Anonymous User")}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {postData.userName ?? "Anonymous User"}
              </h3>
              <p className="text-sm text-gray-500">
                {moment(postData.createdAt).local().fromNow()}
              </p>
            </div>
          </div>
          {myposts && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleOnDialogueOpenEdit}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                title="Edit Post"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={()=> setIsDeleteConfirmationOpen(true)}
                className="cursor-pointer p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                title="Delete post"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Post Content */}
        {postData?.postContent != null && (
          <div className="px-4 pb-3">
            <p className="text-gray-800 leading-relaxed">{postData.postContent}</p>
          </div>
        )}

        {/* Post Image */}
        {postData?.postImage != null && (
          <div className="w-full">
            <img
              src={postData.postImage}
              alt="Post"
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {postData?.postTags?.length > 0 && (
          <div className="px-4 py-3 flex flex-wrap gap-2">
            {postData.postTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full hover:bg-purple-200 cursor-pointer transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Edited Badge */}
        {postData?.isEdited && (
          <div className="px-4 pb-2">
            <span className="text-xs text-gray-400 italic">Edited</span>
          </div>
        )}

        {/* Comments Button */}
        <div className="px-4 py-3 border-t border-gray-100">
          <button
            onClick={handleOnDialogueOpen}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="font-medium">View Comments</span>
          </button>
        </div>
      </article>

      {/* Comments Dialog */}
      <CommentsDialog
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        postId={postData._id}
        comments={comments}
        fetchComments={fetchComments}
        isCommentsLoading={isCommentsLoading}
      />
      <UpdatePostDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        postData={postData}
        fetchPosts={fetchPosts}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onDelete={()=> handleOnDelete(postData)}
      />
    </>
  );
}

export default PostCard;