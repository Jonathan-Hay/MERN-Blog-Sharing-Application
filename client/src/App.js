import "./App.css";
import React, { useEffect } from "react";

import RootLayout from "./components/RootLayout.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "./store/auth";

import BlogPostFeed from "./components/BlogPostFeed.js";
import AddBlogPost from "./components/AddBlogPost";
import Auth from "./components/Auth.js";
import UserBlogPosts from "./components/UserBlogPosts.js";
import EditBlogPost from "./components/EditBlogPost.js";
import WelcomeText from "./components/WelcomeText.js";
import Error from './components/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />, //load this if error found (eg route that DNE)

    children: [
      {
        index: true,
        element: <WelcomeText />,
      },
      {
        path: "blog-feed",
        element: <BlogPostFeed />,
      },
      {
        path: "blogs/new",
        element: <AddBlogPost />,
      },
      {
        path: "my-blogs",
        element: <UserBlogPosts />,
      },
      {
        path: "my-blogs/edit/:id",
        element: <EditBlogPost />,
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

  // return (
  //   <React.Fragment>
  //     <header>
  //       <Header />
  //     </header>

  //     <Routes>
  //       <Route path="/" element={<WelcomeText />} />

  //       {!userIsLoggedIn ? (
  //         <Route path="/auth" element={<Auth />} />
  //       ) : (
  //         <React.Fragment>
  //           <Route path="/blog-feed" element={<BlogPostFeed />} />
  //           <Route path="/blogs/new" element={<AddBlogPost />} />
  //           <Route path="/my-blogs" element={<UserBlogPosts />} />
  //           <Route path="/my-blogs/edit/:id" element={<EditBlogPost />} />
  //         </React.Fragment>
  //       )}
  //     </Routes>
  //   </React.Fragment>
  // );

  return <RouterProvider router={router} />;
}

export default App;
