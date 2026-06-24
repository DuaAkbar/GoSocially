import React from "react";

function DeleteConfirmationDialog({ isOpen = false, onClose, onDelete }) {
  if (!isOpen) return <></>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">

        {/* Icon */}
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Post</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition shadow-sm"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmationDialog;