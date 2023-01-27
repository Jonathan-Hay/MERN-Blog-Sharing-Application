import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            noWrap
            component="a"
            href="/"
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "inherit",
              letterSpacing: '.35rem',
              fontWeight: 600,
            }}
          >
            YouBlog
          </Typography>

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

          <Box display="flex" marginLeft="auto">
            <Button LinkComponent={Link} to="/auth" color="warning">
              Logout
            </Button>
            <Button LinkComponent={Link} to="/auth" color="warning">
              Login
            </Button>
            <Button LinkComponent={Link} to="/auth" color="warning">
              Signup
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
