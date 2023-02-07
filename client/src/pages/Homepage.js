import React from "react";
import WelcomeText from "../components/WelcomeText";
import { useLoaderData, json } from "react-router-dom";

const Homepage = () => {
  const data = useLoaderData();

  let user = { name: "New User", newUser: true };

  if (data) {
    user = data.userAndBlogs;
  }

  return <WelcomeText currentUser={user} />;
};

export async function loader() {
  const userID = localStorage.getItem("userID");

  if (!userID) {
    return null;
  }

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
