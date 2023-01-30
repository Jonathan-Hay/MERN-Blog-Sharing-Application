import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 3, fontSize: "20px", fontWeight: "bold" };

const AddBlogPost = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    title: "",
    imageURL: "",
    text: "",
  });

  const inputChangeHandler = (event) => {
    setInputData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  const addPostHandler = async () => {
    const res = await axios
      .post("http://localhost:5000/post/new", {
        title: inputData.title,
        text: inputData.text,
        image: inputData.imageURL,
        author: localStorage.getItem("userID"),
      })
      .catch((e) => console.log(e));

    const data = await res.data;

    return data;
  };

  const submitHandler = (event) => {
    console.log(inputData);
    event.preventDefault();
    addPostHandler().then(data => console.log(data)).then(() => navigate("/blog-feed"));
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
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
          <TextField
            value={inputData.title}
            name="title"
            onChange={inputChangeHandler}
          />

          <InputLabel
            sx={labelStyles}
            name="imageURL"
            onChange={inputChangeHandler}
          >
            Image URL
          </InputLabel>
          <TextField
            value={inputData.imageURL}
            onChange={inputChangeHandler}
            name="imageURL"
          />

          <InputLabel sx={labelStyles}>Text</InputLabel>
          <TextField
            multiline={true}
            value={inputData.text}
            rows={5}
            margin="auto"
            name="text"
            onChange={inputChangeHandler}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: 3 }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default AddBlogPost;
