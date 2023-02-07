import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { Form, redirect, json } from "react-router-dom";

const labelStyles = { mb: 1, mt: 3, fontSize: "20px", fontWeight: "bold" };

const AddBlogPost = () => {

  return (
    <React.Fragment>
      <Form method={"POST"}>
        <Box
          display="flex"
          flexDirection="column"
          width={"80%"}
          margin={"auto"}
          border={3}
          borderColor="black"
          marginTop={5}
          boxShadow="12px 12px 25px #6b6b6b"
          padding={3.5}
          borderRadius={6}
        >
          <Typography
            fontWeight={"bold"}
            padding={2}
            color="grey"
            variant="h3"
            textAlign="center"
          >
            Create a new blog post
          </Typography>

          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" />

          <InputLabel sx={labelStyles} name="imageURL">
            Image URL
          </InputLabel>
          <TextField name="imageURL" />

          <InputLabel sx={labelStyles}>Text</InputLabel>
          <TextField multiline={true} rows={5} name="text" />

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: 3 }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Form>
    </React.Fragment>
  );
};

export async function action({ request }) {
  const data = await request.formData();

  const newPostData = {
    title: data.get("title"),
    text: data.get("text"),
    image: data.get("imageURL"),
    author: localStorage.getItem("userID"),
  };

  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/post/new/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token

    },
    body: JSON.stringify(newPostData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not create a new blog post" },
      { status: 500 }
    );
  }

  return redirect("/my-blogs");
}

export default AddBlogPost;
