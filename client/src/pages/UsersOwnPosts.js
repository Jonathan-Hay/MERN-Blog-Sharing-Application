import { useLoaderData, json } from "react-router-dom";
import UsersPostsList from "../components/UsersPostsList";
import { redirect } from "react-router-dom";



function UsersOwnPosts() {
  const data = useLoaderData();

  const usersBlogPosts = data.userAndBlogs;

  return <UsersPostsList blogPosts={usersBlogPosts} />;
}

export default UsersOwnPosts;

export async function loader() {

  const token = localStorage.getItem("token");
  if (!token) {
    console.log("redirecting");
    return redirect("/auth?type=login");
  }


  const userID = localStorage.getItem("userID");

  const response = await fetch(`http://localhost:5000/post/user/${userID}`);

  if (!response.ok) {
    throw json(
      { message: "Could not get blog posts." },
      {
        status: 500,
      }
    );
  } else {
    console.log(response);
    return response;
  }
}
