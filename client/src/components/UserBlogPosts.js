import React, { useState, useEffect } from "react";
import axios from "axios";

import BlogPost from "./BlogPost";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";

const UserBlogPosts = () => {
  const [currentUser, setCurrentUser] = useState();

  const userID = localStorage.getItem("userID");
  const fetchUserByID = async () => {
    const res = await axios
      .get(`http://localhost:5000/post/user/${userID}`)
      .catch((e) => console.log(e));

    const data = await res.data;
    console.log(data);

    return data;
  };

  useEffect(() => {
    fetchUserByID().then((data) => setCurrentUser(data.userAndBlogs));
  }, []);

  return (
    <React.Fragment>
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
        textAlign="center"
        mb={5}
      >
        <Typography variant="h3">
          {currentUser ? currentUser.name : ""}'s Blog Posts
        </Typography>
      </Box>
      {currentUser &&
        currentUser.blogs &&
        currentUser.blogs.map((blogPost, index) => (
          <BlogPost
            title={blogPost.title}
            key={index}
            id={blogPost._id}
            author={currentUser.name}
            text={blogPost.text}
            image={blogPost.image}
            userIsAuthor={blogPost.author === localStorage.getItem("userID")}
          />
        ))}

      {currentUser && currentUser.blogs.length === 0 && (
        <Container maxWidth="md">
          <Box py={10}>
            <Box textAlign="center" mb={5}>
              <Container maxWidth="sm">
                <Box my={4}>
                  <Typography variant="h3">No posts found!</Typography>
                </Box>
              </Container>
              <Box>
                <Typography
                  variant="h4"
                  color="textSecondary"
                  paragraph={true}
                  mt={4}
                >
                  Create a new blog post first.{" "}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </React.Fragment>
  );
};

export default UserBlogPosts;
