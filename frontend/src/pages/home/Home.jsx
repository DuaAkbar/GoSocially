import { useEffect, useState } from "react";
import Header from "../../components/Header";
import PostCard from "../../components/PostCard";
import axios from "axios";
import SkeletonPostCard from "../../components/SkeletonPostCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentUserId = localStorage.getItem("userId");
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token")
      const responce = await axios.get(
        "http://localhost:5000/api/v1/posts/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPosts(responce.data.posts);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/auth/login");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/auth/check-auth",
          {
            token,
          },
        );
        if (response.data.sucess === false) {
          navigate("/auth/login");
        }
      } catch (e) {
        navigate("/auth/login");
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feed</h1>
          <p className="text-gray-600">
            Discover what's happening in your community
          </p>
        </div>

        {isLoading ? (
          <SkeletonPostCard />
        ) : (
          <>
            {" "}
            {posts.map((p) => {
              const ismyposts = p.userId === currentUserId; 
               console.log("post object:", posts);
              return <PostCard postData={p} myposts={ismyposts}  fetchPosts={fetchPosts} />;
            })}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
