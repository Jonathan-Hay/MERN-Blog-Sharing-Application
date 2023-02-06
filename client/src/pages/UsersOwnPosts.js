import { useLoaderData, json } from "react-router-dom";
import UsersPostsList from "../components/UsersPostsList";

function EventsPage() {
    const data = useLoaderData();
    console.log(data);

    const usersBlogPosts = data.userAndBlogs;

    return <UsersPostsList blogPosts={usersBlogPosts} />;
}

export default EventsPage;

export async function loader() {
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
      console.log(response)
    return response;
  }
}
