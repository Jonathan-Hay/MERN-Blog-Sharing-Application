import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Box, Typography, Avatar } from "@mui/material";
import { current } from "@reduxjs/toolkit";

const WelcomeText = () => {
  const [currentUser, setCurrentUser] = useState();

  const userID = localStorage.getItem("userID");

  const fetchUserByID = async () => {
    const res = await axios
      .get(`http://localhost:5000/post/user/${userID}`)
      .catch((e) => console.log(e));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    if (!userID) {
      return;
    }

    fetchUserByID().then((data) => setCurrentUser(data.userAndBlogs));
  }, [userID]);

  return (
    <section>
      <Container maxWidth="md">
        <Box py={10}>
          <Box textAlign="center" mb={5}>
            <Container maxWidth="sm">
              <Box my={4}>
                <Typography variant="h3">Welcome to YouBlog!</Typography>
              </Box>

              {currentUser && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
                    {currentUser.name.charAt(0)}
                  </Avatar>
                  <Box ml={2}>
                    <Typography variant="subtitle1">
                      {currentUser.name}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Container>
            <Box>
              <Typography
                variant="h4"
                color="textSecondary"
                paragraph={true}
                mt={4}
              >
                Get started by clicking your feed to see the blogs of other
                users!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default WelcomeText;
