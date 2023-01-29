import React from "react";

import { Container, Box, Typography, Avatar } from "@mui/material";

const WelcomeText = () => {
  const content = {
    "header-p1": "Donec lacinia",
    "header-p2": "Welcome to YouBlog",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
    name: "Linda Williams",
    job: "Founder and CEO",
    paragraph1: "Get started by clicking your feed to see the blogs of other users!",
  };

  return (
    <section>
      <Container maxWidth="md">
        <Box py={10}>
          <Box textAlign="center" mb={5}>
            <Container maxWidth="sm">
              <Box my={4}>
                <Typography variant="h3">{content["header-p2"]}</Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar alt="" src={content["avatar"]} />
                <Box ml={2}>
                  <Typography variant="subtitle1">{content["name"]}</Typography>
                </Box>
              </Box>
            </Container>
            <Box>
              <Typography variant="h4" color="textSecondary" paragraph={true} mt={4}>
                {content["paragraph1"]}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default WelcomeText;
