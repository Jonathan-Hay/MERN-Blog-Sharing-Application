import { useLoaderData, json } from "react-router-dom";
import BlogPostsList from "../components/BlogPostsList";
import { redirect } from "react-router-dom";


function BlogPostFeed() {
  const data = useLoaderData();

  const blogPosts = data.allBlogPosts;

  return <BlogPostsList blogPosts={blogPosts} />;
}

export default BlogPostFeed;

export async function loader() {

  const token = localStorage.getItem("token");
  if (!token) {
    console.log("redirecting");
    return redirect("/auth?type=login");
  }

  
  const response = await fetch("http://localhost:5000/post");

  if (!response.ok) {
    throw json(
      { message: "Could not get blog posts." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
