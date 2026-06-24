import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import axios from "axios";
import SkeletonPostCard from "../components/SkeletonPostCard";
import { useNavigate } from "react-router-dom";
import { SocialMediaState } from "../../context/SocialMediaContext";
import Snackbar from "../components/Snackbar"

function Home() {
  const [isDeleteSnackbarOpen, setIsDeleteSnackbarOpen] = useState(false);
  const { checkAuth, fetchPostsByUser, isLoading, posts } =
    useContext(SocialMediaState);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    fetchPostsByUser();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Feed</h1>
          <p className="text-gray-600">
            Discover what's happening in your community
          </p>
        </div>

       {isLoading ? (
          <SkeletonPostCard />
        ) : (
          <>
            {posts && posts.length > 0 ? posts.map((p) => {
              return <PostCard postData={p} myposts={true} fetchPosts={fetchPostsByUser} />;
            }) : <h1>No Posts Found For This User</h1>}
          </>
        )}
      </main>
       <Snackbar
        isOpen={isDeleteSnackbarOpen}
        message={"Post Deleted Successfully"}
        onClose={() => setIsDeleteSnackbarOpen(false)}
        type="error"
      />
    </div>
  );
}

export default Home;
