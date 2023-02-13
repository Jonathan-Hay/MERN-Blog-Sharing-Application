import React from "react";
import BlogPost from "./BlogPost";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

const BlogPostFeed = ({ blogPosts }) => {

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
        <Typography variant="h3">Your Blog Feed</Typography>
      </Box>
      {blogPosts &&
        blogPosts.map((blogPost, index) => (
          <BlogPost
            title={blogPost.title}
            key={index}
            author={blogPost.author.name}
            text={blogPost.text}
            image={blogPost.image}
            id={blogPost._id}
            userIsAuthor={
              blogPost.author._id === localStorage.getItem("userID")
            }
          />
        ))}
      
      {blogPosts && blogPosts.length === 0 && (
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
                  Nobody has added any blog posts! 
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </React.Fragment>
  );
};

export default BlogPostFeed;
