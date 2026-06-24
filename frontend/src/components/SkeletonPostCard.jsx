// SkeletonPostCard.jsx
export default function SkeletonPostCard() {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>

      {/* Post Image */}
      <div className="w-full h-96 bg-gray-300"></div>

      {/* Tags */}
      <div className="px-4 py-3 flex gap-2">
        <div className="h-7 w-20 bg-gray-300 rounded-full"></div>
        <div className="h-7 w-24 bg-gray-300 rounded-full"></div>
        <div className="h-7 w-28 bg-gray-300 rounded-full"></div>
      </div>

      {/* Edited Badge */}
      <div className="px-4 pb-2">
        <div className="h-3 w-12 bg-gray-300 rounded"></div>
      </div>
    </article>
  );
}