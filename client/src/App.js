import "./App.css";
import React from "react";

import Header from "./components/Header.js";
import { Route, Routes } from "react-router-dom";

import BlogPostFeed from "./components/BlogPostFeed.js";
import AddBlogPost from "./components/AddBlogPost";
import Auth from "./components/Auth.js";
import UserBlogPosts from "./components/UserBlogPosts.js";
import BlogPostDetail from "./components/BlogPostDetail.js";


function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>

      <Routes>
        <Route path="/auth" element={<Auth />} />


        <Route path="/blog-feed" element={<BlogPostFeed />} />
        <Route path="/blogs/new" element={<AddBlogPost />} />
        <Route path="/my-blogs" element={<UserBlogPosts />} />
        <Route path="/my-blogs/:id" element={<BlogPostDetail />} />


      </Routes>
    </React.Fragment>
  );
}

export default App;
