import {
  Button,
  InputLabel,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const BlogPostDetail = () => {
  const navigate = useNavigate();
  const [blogToedit, setBlogToEdit] = useState();
  const postID = useParams().id;

  const [inputData, setInputData] = useState({title: "", text: ""});

  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchPostData = async () => {
    const res = await axios
      .get(`http://localhost:5000/post/${postID}`)
      .catch((e) => console.log(e));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchPostData().then((data) => {
      setBlogToEdit(data.blogPost);

      setInputData({
        title: data.blogPost.title,
        text: data.blogPost.text,
      });
    });
  }, [postID]);


  const handleEditPost = async () => {
    const res = await axios
      .put(`http://localhost:5000/post/edit/${postID}`, {
        title: inputData.title,
        description: inputData.text,
      })
      .catch((e) => console.log(e));

    const data = await res.data;
    return data;
  };

  const deleteHandler = async () => {
    const res = await axios
      .delete(`http://localhost:5000/post/${postID}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteHandler().then(() => navigate("/my-blogs"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditPost()
      .then((data) => console.log(data))
      .then(() => navigate("/my-blogs"));
  };

  return (
    <div>
      {inputData && (
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
              value={inputData.title}
              variant="outlined"
            />
            <InputLabel>Text</InputLabel>
            <TextField
              name="text"
              onChange={handleChange}
              value={inputData.text}
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
        </form>
      )}
    </div>
  );
};

export default BlogPostDetail;
