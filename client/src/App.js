import "./App.css";
import React from "react";

import RootLayout from "./components/RootLayout.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";

import { loader as blogPostFeedLoader } from "./pages/BlogPostFeed.js";
import { loader as usersBlogsLoader } from "./pages/UsersOwnPosts";
import { loader as blogPostDataLoader } from "./pages/ModifyBlogPost";
import { loader as userAvatarLoader } from "./pages/Homepage";
import { loader as authCheckLoader } from "./pages/NewBlogPost";


import { getAuthToken } from './util/auth';


import BlogPostFeed from "./pages/BlogPostFeed.js";
import UsersOwnPosts from "./pages/UsersOwnPosts.js";
import ModifyBlogPost from "./pages/ModifyBlogPost.js";
import NewBlogPost from "./pages/NewBlogPost.js";
import Homepage from "./pages/Homepage.js";
import Authentication from "./pages/Authentication.js";




import { action as EditBlogPostAction } from "./components/EditBlogPostForm";
import { action as AddBlogPostAction } from "./components/AddBlogPostForm";
import { action as authenticateAction } from "./pages/Authentication";




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />, 
    id: 'root',
    loader: getAuthToken,

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
        action: AddBlogPostAction,
        loader: authCheckLoader
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
        element: <Authentication />,
        action: authenticateAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
