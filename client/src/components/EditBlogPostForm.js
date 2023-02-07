import {
  Button,
  InputLabel,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useNavigate, useParams, Form, redirect, json } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const BlogPostDetail = ({ blogPost }) => {
  const navigate = useNavigate();
  const postID = useParams().id;

  //TO DO: move to a loader and authenticate
  const deleteHandler = async () => {
    // const res = await axios
    //   .delete(`http://localhost:5000/post/${postID}`)
    //   .catch((err) => console.log(err));
    // const data = await res.data;
    // return data;

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/post/${postID}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw json(
        { message: "Could not delete post." },
        {
          status: 500,
        }
      );
    }
  };

  const handleDelete = () => {
    deleteHandler().then(() => navigate("/my-blogs"));
  };

  return (
    <Form method={"patch"}>
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
        <Box display="flex">
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleDelete}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </Box>
        <Typography
          fontWeight={"bold"}
          padding={2}
          color="grey"
          variant="h3"
          textAlign="center"
        >
          Edit Your Blog
        </Typography>
        <InputLabel>Title</InputLabel>
        <TextField
          name="title"
          defaultValue={blogPost ? blogPost.title : "a"}
          variant="outlined"
        />
        <InputLabel>Text</InputLabel>
        <TextField
          name="text"
          defaultValue={blogPost ? blogPost.text : ""}
          variant="outlined"
          rows={5}
          multiline={true}
        />

        <Button
          sx={{ mt: 2, borderRadius: 4 }}
          variant="contained"
          color="warning"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Form>
  );
};

export async function action({ request, params }) {
  const data = await request.formData();

  const blogPostdata = {
    title: data.get("title"),
    text: data.get("text"),
  };

  const id = params.id;
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5000/post/edit/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(blogPostdata),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "error: not modify blog post." }, { status: 500 });
  }

  return redirect("/my-blogs");
}

export default BlogPostDetail;
