import React from "react";
import WelcomeText from "../components/WelcomeText";
import { useLoaderData, json } from "react-router-dom";

const Homepage = () => {
  const data = useLoaderData();
  const user = data.userAndBlogs;
  return <WelcomeText currentUser={user} />;
};

export async function loader() {
  const userID = localStorage.getItem("userID");
  const response = await fetch(`http://localhost:5000/post/user/${userID}`);

  if (!response.ok) {
    throw json(
      { message: "Could not get user." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export default Homepage;
