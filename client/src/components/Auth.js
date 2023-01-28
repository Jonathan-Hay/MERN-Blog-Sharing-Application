import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <React.Fragment>
      <form>
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
          <Typography>Sign up</Typography>

          {isSignup && <TextField margin="normal" placeholder="account name" />}

          <TextField margin="normal" placeholder="email" />
          <TextField margin="normal" placeholder="password" />
          <Button variant="outlined" sx={{ borderRadius: 3, marginTop: 3 }}>
            Sign up
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default Auth;
