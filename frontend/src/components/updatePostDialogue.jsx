import React, { useRef, useState } from "react";
import { getUserInitials } from "../../utils/utility";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocialMediaState } from "../../context/SocialMediaContext";

function UpdatePostDialog({ isOpen = false, onClose, postData }) {

  const imageInputRef = useRef(null);

  const {
    imageLoading,
    postImage,
    SetpostImage,
    postContent,
    setPostContent,
    postTags,
    SetpostTags,
    visibility,
    Setvisibility,
    handleOnImageChange,
    handleOnUpdateSubmit,
  } = useContext(SocialMediaState);

  
  if (!isOpen) return null;

  const handleOnUpdateSubmitOnButton = async(e, postData) => {
     e.preventDefault();
  await handleOnUpdateSubmit( e , postData);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Update Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6">
          <form className="space-y-6">
            {/* User Info */}
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
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
                value={postContent}
                id="postContent"
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Share your thoughts..."
              />
            </div>

            {/* Post Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Image{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>

              {imageLoading ? (
                <div className="relative border-2 border-dashed border-purple-300 rounded-xl overflow-hidden h-48 bg-purple-50 flex flex-col items-center justify-center animate-pulse">
                  <div className="w-12 h-12 bg-purple-200 rounded-full mb-3" />
                  <div className="h-3 bg-purple-200 rounded w-32 mb-2" />
                  <div className="h-2 bg-purple-200 rounded w-24" />
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 w-2/3" />
                </div>
              ) : postImage ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={postImage}
                    alt="Post preview"
                    className="w-full max-h-72 object-cover block"
                  />
                  <button
                    type="button"
                    onClick={() => SetpostImage("")}
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
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 cursor-pointer group"
                >
                  <input
                    ref={imageInputRef}
                    type="file"
                    id="postImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleOnImageChange}
                  />
                  <div className="w-14 h-14 bg-gray-100 group-hover:bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                    <svg
                      className="w-7 h-7 text-gray-400 group-hover:text-purple-500 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium mb-1 group-hover:text-purple-700 transition-colors">
                    Click to upload an image
                  </p>
                  <p className="text-sm text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
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
                value={postTags}
                type="text"
                id="tags"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="#nature #hiking #mountains"
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
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-gray-700">Public</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    onChange={(e) => setVisibility(e.target.value)}
                    type="radio"
                    name="visibility"
                    value="private"
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-gray-700">Private</span>
                </label>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
              onClick={(e)=> handleOnUpdateSubmitOnButton(e , postData)}
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                Update Post
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePostDialog;
