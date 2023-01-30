import "./App.css";
import React, { useEffect } from "react";

import Header from "./components/Header.js";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "./store/auth";

import BlogPostFeed from "./components/BlogPostFeed.js";
import AddBlogPost from "./components/AddBlogPost";
import Auth from "./components/Auth.js";
import UserBlogPosts from "./components/UserBlogPosts.js";
import BlogPostDetail from "./components/BlogPostDetail.js";
import WelcomeText from "./components/WelcomeText.js";

function App() {
  const userIsLoggedIn = useSelector((state) => state.isAuthenticated);
  console.log(" logged in" + userIsLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>

      <Routes>
        <Route path="/" element={<WelcomeText />} />

        {!userIsLoggedIn ? (
          <Route path="/auth" element={<Auth />} />
        ) : (
          <React.Fragment>
            <Route path="/blog-feed" element={<BlogPostFeed />} />
            <Route path="/blogs/new" element={<AddBlogPost />} />
            <Route path="/my-blogs" element={<UserBlogPosts />} />
            <Route path="/my-blogs/:id" element={<BlogPostDetail />} />
          </React.Fragment>
        )}
      </Routes>
    </React.Fragment>
  );
}

export default App;
