import React from "react";
import AddBlogPost from "../components/AddBlogPostForm";
import { redirect } from "react-router-dom";

const NewBlogPost = () => {
  return <AddBlogPost />;
};

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("redirecting");
    return redirect("/auth?type=login");
  }

  return null;
}

export default NewBlogPost;
