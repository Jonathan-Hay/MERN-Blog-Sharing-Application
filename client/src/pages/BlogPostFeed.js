import { useLoaderData, json } from "react-router-dom";
import BlogPostsList from "../components/BlogPostsList";

function EventsPage() {
  const data = useLoaderData();

  const blogPosts = data.allBlogPosts;

  return <BlogPostsList blogPosts={blogPosts} />;
  
}

export default EventsPage;

export async function loader() {
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
