import { useLoaderData, json } from "react-router-dom";
import EditBlogPost from "../components/EditBlogPostForm";
import { redirect } from "react-router-dom";

function ModifyBlogPost() {
  const data = useLoaderData();

  return <EditBlogPost blogPost={data.blogPost} />;
}

export default ModifyBlogPost;

export async function loader({ request, params }) {

  const token = localStorage.getItem("token");
  if (!token) {
    console.log("redirecting");
    return redirect("/auth?type=login");
  }


  const id = params.id;
  const response = await fetch("http://localhost:5000/post/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected blog post." },
      {
        status: 500,
      }
    );
  } else {
    console.log(response);
    return response;
  }
}
