import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useSearchParams, Form } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("type") === "signup";

  const [authInputs, setAuthInputs] = useState({
    email: "",
    name: "",
    password: "",
  });

  const authRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/user/${type}`, {
        email: authInputs.email,
        name: authInputs.name,
        password: authInputs.password,
      })
      .catch((e) => console.log(e));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //to do later: display error messages
    if (isSignup) {
      authRequest("signup")
        .then((data) => localStorage.setItem("userID", data.newUser._id)) //maybe rename newUser
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/"));
    } else {
      authRequest()
        .then((data) => localStorage.setItem("userID", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/"))
        .catch((e) => console.log(e));
    }
  };

  return (
    <React.Fragment>
      <Form method="post" >
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

          {isSignup && (
            <TextField
              margin="normal"
              placeholder="account name"
              name="name"
            />
          )}

          <TextField
            margin="normal"
            placeholder="email"
            name="email"
          />
          <TextField
            margin="normal"
            placeholder="password"
            name="password"
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
