import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SocialMediaState = createContext(null);

function SocialMediaContext({ children }) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  //to fetch the posts
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
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

  // To Check Loggedin Pages Autentications
  const checkAuth = async () => {
    if (token == null) {
      navigate("/auth/login");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/auth/check-auth",
          {
            token,
          },
        );
        if (response.data.success === false) {
          navigate("/auth/login");
        }
      } catch (e) {
        navigate("/auth/login");
      }
    }
  };

  //fetch posts by user
  const fetchPostsByUser = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");
      const responce = await axios.get(
        `http://localhost:5000/api/v1/posts/get-user-posts/${userId}`,
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

  //to delete posts
  const handleOnDelete = async (postData) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/posts/delete/${postData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchPostsByUser();
      setSnackbarOpen(true);
      setSnackbarMessage("Post Deleted Successfully");
      setSnackbarType("error");
      navigate("/posts/my-posts");
    } catch (err) {
      console.error(err);
    }
  };

  //to create posts
  const [postContent, setPostContent] = useState("");
  const [postImage, SetpostImage] = useState("");
  const [postTags, SetpostTags] = useState("");
  const [visibility, Setvisibility] = useState("public");
  const [imageLoading, setImageLoading] = useState(false);

  //to handle image change
  const handleOnImageChange = async (e) => {
    setImageLoading(true);
    const selectedFile = e.target.files?.[0];
    const data = new FormData();
    data.append("myfile", selectedFile);
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/api/v1/media/upload",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.data.success) {
      SetpostImage(response.data.data.url);
    }
    setImageLoading(false);
  };

  // to handle posts creation
  const handleOnPostCreated = async (e) => {
    e.preventDefault();

    let modifiedTags;
    if (postTags !== "") {
      modifiedTags = postTags.split("#");
      modifiedTags.shift();
    }

    const userId = localStorage.getItem("userId");
    const body = {
      userId,
      userName: localStorage.getItem("userName"),
      ...(postContent && { postContent: postContent }),
      ...(postTags && { postTags: modifiedTags}),
      visibility: visibility,
      ...(postImage && { postImage: postImage }),
    };

    const token = localStorage.getItem("token");
    console.log("BODY SENT:", body);
    const response = await axios.post(
      "http://localhost:5000/api/v1/posts/create",
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.data.success) {
      setSnackbarOpen(true);
      setSnackbarMessage(response.data.message || "Post Created Successfully");
      setSnackbarType("success");
      navigate("/posts/my-posts");
    }
  };

  // to handle posts updation
  const handleOnUpdateSubmit = async (e, postData) => {
    e.preventDefault();

    let modifiedTags;
    if (postTags != "") {
      modifiedTags = postTags.split("#");
      modifiedTags.shift();
    }

    const body = {
      ...(postContent && { postContent }),
      ...(postTags && { postTags: modifiedTags}),
      visibility,
      ...(postImage && { postImage }),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/v1/posts/update/${postData?._id}`,
        body,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        navigate("/posts/my-posts");
      }
        await fetchPostsByUser(); 
        setPostContent("");
        SetpostImage("");
        Setvisibility("public");
        SetpostTags("");
        setSnackbarOpen(true);
        setSnackbarMessage(
          response.data.message || "Post Updated Successfully",
        );
        setSnackbarType("success");
        navigate("/posts/my-posts");
      
    } catch (err) {
      console.error("Post update failed:", err);
    }
  };

  // Snackbar stuff
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");

  return (
    <>
      <SocialMediaState.Provider
        value={{
          posts: posts,
          isLoading: isLoading,
          fetchPosts: fetchPosts,
          checkAuth: checkAuth,
          fetchPostsByUser: fetchPostsByUser,
          handleOnDelete: handleOnDelete,
          postContent: postContent,
          postImage: postImage,
          SetpostImage: SetpostImage,
          setPostContent: setPostContent,
          postTags: postTags,
          SetpostTags: SetpostTags,
          visibility: visibility,
          Setvisibility: Setvisibility,
          navigate: navigate,
          imageLoading: imageLoading,
          setImageLoading: setImageLoading,
          handleOnImageChange: handleOnImageChange,
          handleOnPostCreated: handleOnPostCreated,
          handleOnUpdateSubmit: handleOnUpdateSubmit,
          snackbarOpen,
          snackbarMessage,
          snackbarType,
          handleOnSnackbarClose: () => setSnackbarOpen(false),
        }}
      >
        {children}
      </SocialMediaState.Provider>
    </>
  );
}

export default SocialMediaContext;
