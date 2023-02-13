import React from "react";
import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";

const Authentication = () => {
  return <AuthForm />;
};

export default Authentication;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const type = searchParams.get("type") || "login";

  if (type !== "login" && type !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const inputData = {
    email: data.get("email"),
    password: data.get("password"),
    name: data.get("name"),
  };

  console.log(inputData);

  const response = await fetch(`http://localhost:5000/user/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();

  localStorage.setItem("userID", resData.user._id);

  const token = resData.token;

  localStorage.setItem("token", token);
  return redirect("/");
}
