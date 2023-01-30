import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from '../store/auth';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

function Header() {
  const isLoggedIn = useSelector((state) => state.isAuthenticated);
  console.log(isLoggedIn);

  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <InsertEmoticonIcon />
          <Typography
            noWrap
            component="a"
            href="/"
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "inherit",
              letterSpacing: ".35rem",
              fontWeight: 600,
            }}
          >
            YouBlog
          </Typography>
          {isLoggedIn && (
            <Box
              display="flex"
              marginLeft={"auto"}
              marginRight="auto"
              justifyContent="space-between"
            >
              <Button LinkComponent={Link} to="/blog-feed" color="warning">
                Blog Feed
              </Button>
              <Button LinkComponent={Link} to="/my-blogs" color="warning">
                My Blogs
              </Button>
              <Button LinkComponent={Link} to="/blogs/new" color="warning">
                New Blog
              </Button>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            {isLoggedIn && (
              <Button onClick={() => dispatch(authActions.logout())} LinkComponent={Link} to="/auth" color="warning">
                Logout
              </Button>
            )}

            {!isLoggedIn && (
              <React.Fragment>
                <Button LinkComponent={Link} to="/auth" color="warning">
                  Login
                </Button>
                <Button LinkComponent={Link} to="/auth" color="warning">
                  Signup
                </Button>
              </React.Fragment>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
