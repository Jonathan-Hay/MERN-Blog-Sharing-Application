import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, redirect } from "react-router-dom";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

import { useRouteLoaderData } from "react-router-dom";

function Header() {
  const authToken = useRouteLoaderData("root");

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
          {authToken && (
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
            {authToken && (
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("expiration");
                  localStorage.removeItem("userID");

                  return redirect("/");
                }}
                LinkComponent={Link}
                to="/auth?type=login"
                color="warning"
              >
                Logout
              </Button>
            )}

            {!authToken && (
              <React.Fragment>
                <Button
                  LinkComponent={Link}
                  to="/auth?type=login"
                  color="warning"
                >
                  Login
                </Button>
                <Button
                  LinkComponent={Link}
                  to="/auth?type=signup"
                  color="warning"
                >
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
