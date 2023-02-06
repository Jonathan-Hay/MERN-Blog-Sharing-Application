import "./App.css";
import React, { useEffect } from "react";

import RootLayout from "./components/RootLayout.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";

import Auth from "./components/Auth.js";
import Error from "./components/Error";

import { loader as blogPostFeedLoader } from "./pages/BlogPostFeed.js";
import { loader as usersBlogsLoader } from "./pages/UsersOwnPosts";
import { loader as blogPostDataLoader } from "./pages/ModifyBlogPost";
import { loader as userAvatarLoader } from "./pages/Homepage";


import BlogPostFeed from "./pages/BlogPostFeed.js";
import UsersOwnPosts from "./pages/UsersOwnPosts.js";
import ModifyBlogPost from "./pages/ModifyBlogPost.js";
import NewBlogPost from "./pages/NewBlogPost.js";
import Homepage from "./pages/Homepage.js";



import { action as EditBlogPostAction } from "./components/EditBlogPostForm";
import { action as AddBlogPostAction } from "./components/AddBlogPostForm";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />, 

    children: [
      {
        index: true,
        element: <Homepage />,
        loader: userAvatarLoader
      },
      {
        path: "blog-feed",
        element: <BlogPostFeed />,
        loader: blogPostFeedLoader,
      },

      {
        path: "blogs/new",
        element: <NewBlogPost />,
        action: AddBlogPostAction
      },
      {
        path: "my-blogs",
        element: <UsersOwnPosts />,
        loader: usersBlogsLoader,
      },
      {
        path: "my-blogs/edit/:id",
        element: <ModifyBlogPost />,
        loader: blogPostDataLoader,
        action: EditBlogPostAction,
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

function App() {
  const userIsLoggedIn = useSelector((state) => state.isAuthenticated);
  console.log(" logged in" + userIsLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
