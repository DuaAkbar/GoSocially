import { useContext, useRef, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserInitials } from "../../utils/utility.js";
import SocialMediaContext, { SocialMediaState } from "../../context/SocialMediaContext.jsx";

/* ─── Skeleton ──────────────────────────────────────────────────────────── */
function CreatePostSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fake header bar */}
      <div className="h-16 bg-white border-b border-gray-200" />

      <main className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
        {/* Heading */}
        <div className="mb-6 space-y-2">
          <div className="h-8 bg-gray-200 rounded-lg w-48" />
          <div className="h-4 bg-gray-200 rounded w-64" />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          {/* User info */}
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-28" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
          </div>

          {/* Textarea */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-36 mb-2" />
            <div className="h-36 bg-gray-200 rounded-lg w-full" />
          </div>

          {/* Image upload */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-40 mb-2" />
            <div className="h-32 bg-gray-200 rounded-lg w-full" />
          </div>

          {/* Tags */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-12 bg-gray-200 rounded-lg w-full" />
          </div>

          {/* Visibility */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
            <div className="flex space-x-4">
              <div className="h-5 bg-gray-200 rounded w-20" />
              <div className="h-5 bg-gray-200 rounded w-20" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
            <div className="w-28 h-12 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
function CreatePost() {
  
  const imageInputRef = useRef(null);

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
  } = useContext(SocialMediaState);


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-sky-100 to-pink-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent mb-2">
            Create Post
          </h1>
          <p className="text-gray-600">
            Share your thoughts with the community
          </p>
        </div>

        {/* Create Post Form */}
        <div className="bg-white rounded-2xl shadow-md p-6 backdrop-blur-sm bg-opacity-95">
          <form className="space-y-6" onSubmit={handleOnPostCreated}>
            {/* User Info */}
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-sky-500 rounded-full flex items-center justify-center text-white font-semibold">
                {getUserInitials(localStorage.getItem("userName"))}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {localStorage.getItem("userName")}
                </h3>
              </div>
            </div>

            {/* Post Content */}
            <div>
              <label
                htmlFor="postContent"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What's on your mind?
              </label>
              <textarea
                onChange={(e) => setPostContent(e.target.value)}
                id="postContent"
                value={postContent}
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition resize-none"
                placeholder="Share your thoughts..."
              ></textarea>
            </div>

            {/* Post Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Image (Optional)
              </label>

              {imageLoading ? (
                /* ── Upload progress skeleton ── */
                <div className="relative border-2 border-dashed border-purple-300 rounded-xl overflow-hidden h-48 bg-purple-50 flex flex-col items-center justify-center animate-pulse">
                  <div className="w-12 h-12 bg-purple-200 rounded-full mb-3" />
                  <div className="h-3 bg-purple-200 rounded w-32 mb-2" />
                  <div className="h-2 bg-purple-200 rounded w-24" />
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-[progress_1.5s_ease-in-out_infinite] w-2/3" />
                </div>
              ) : postImage ? (
                /* ── Uploaded image preview ── */
                <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={postImage}
                    alt="Post preview"
                    className="w-full max-h-72 object-cover block"
                  />
                  {/* X delete button */}
                  <button
                    type="button"
                    onClick={() => postImage("")}
                    className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full flex items-center justify-center transition shadow-md"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => imageInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-pink-400 transition cursor-pointer"
                >
                  <input
                    ref={imageInputRef}
                    onChange={handleOnImageChange}
                    type="file"
                    id="postImage"
                    className="hidden"
                    accept="image/*"
                  />
                  <label htmlFor="postImage" className="cursor-pointer">
                    <svg
                      className="w-12 h-12 text-pink-400 mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-600 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </label>
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tags
              </label>
              <input
                onChange={(e) => SetpostTags(e.target.value)}
                type="text"
                value={postTags}
                id="tags"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition"
                placeholder="Add tags separated by # (#cool#hiking#great)"
              />
              <p className="text-sm text-gray-500 mt-2">
                Use hashtags to help others discover your post
              </p>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Visibility
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    onChange={(e) => Setvisibility(e.target.value)}
                    type="radio"
                    name="visibility"
                    value="public"
                    defaultChecked
                    className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-400"
                  />
                  <span className="text-gray-700">Public</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    onChange={(e) => Setvisibility(e.target.value)}
                    type="radio"
                    name="visibility"
                    value="private"
                    className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-400"
                  />
                  <span className="text-gray-700">Private</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-pink-500 to-sky-500 hover:from-pink-600 hover:to-sky-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Publish Post
              </button>
              <button
                type="button"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent mb-4">
            Preview
          </h2>
          <div className="bg-white rounded-2xl shadow-md p-6 backdrop-blur-sm bg-opacity-95">
            <p className="text-gray-500 text-center py-8">
              Your post preview will appear here
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreatePost;
