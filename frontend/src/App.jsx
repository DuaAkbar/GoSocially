import React, { useContext } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MyPosts from "./posts/MyPosts";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import CreatePost from "./posts/CreatePosts";
import UpdateProfile from "./pages/profile/ProfilePage";
import { SocialMediaState } from "../context/SocialMediaContext";
import Snackbar from "./components/Snackbar";

const App = () => {
  const { snackbarOpen, snackbarMessage, snackbarType, handleOnSnackbarClose } =
    useContext(SocialMediaState);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/posts/my-posts" element={<MyPosts />} />
        <Route path="/posts/create-posts" element={<CreatePost />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
      </Routes>
      <Snackbar isOpen={snackbarOpen} message={snackbarMessage} onClose={handleOnSnackbarClose} type={snackbarType}/>
      
    </>                               
  );
};

export default App;
