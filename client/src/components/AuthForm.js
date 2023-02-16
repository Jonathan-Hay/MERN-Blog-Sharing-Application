import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, useSearchParams, Form, useActionData } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("type") === "signup";
  const errorData = useActionData();

  return (
    <React.Fragment>
      <Form method="post">
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
            {isSignup ? "Signup" : "Login"}
          </Typography>

          {errorData && errorData.message && (
            <Typography fontWeight={"bold"} padding={2}>
              {errorData.message}
            </Typography>
          )}

          {errorData && errorData.errors && (
            <ul>
              {Object.values(errorData.errors).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          {isSignup && (
            <TextField margin="normal" placeholder="account name" name="name" />
          )}

          <TextField margin="normal" placeholder="email" name="email" />
          <TextField
            margin="normal"
            placeholder="password"
            name="password"
            type="password"
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            {!isSignup ? "Login" : "Signup"}
          </Button>

          <Button
            LinkComponent={Link}
            sx={{ borderRadius: 3, marginTop: 3 }}
            to={`?type=${isSignup ? "login" : "signup"}`}
            color="warning"
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </Form>
    </React.Fragment>
  );
};

export default Auth;
