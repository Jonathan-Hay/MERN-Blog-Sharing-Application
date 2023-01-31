import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Alert,
  Box,
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Snackbar,
  IconButton,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

export default function BlogPost(props) {

  const avatarString = props.author ? props.author.charAt(0) : "";

  const navigate = useNavigate();


  const editHandler = () => {
    navigate(`/my-blogs/edit/${props.id}`);
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        padding: 2.5,
        boxShadow: "3px 3px 10px #1E1C1C",
        ":hover": {
          boxShadow: "3px 3px 25px #1E1C1C",
        },
        mt: 1.5,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
            {avatarString}
          </Avatar>
        }
        action={
          ("isAuthor"==="isAuthor") && (
            <Box display="flex" onClick={editHandler}>
              <IconButton sx={{ marginLeft: "auto" }}>
                <EditIcon color="warning" />
              </IconButton>
            </Box>
          )
        }
        title={props.title}
      />

      <CardMedia
        sx={{ height: 140 }}
        image= {props.image}
        title="green iguana"
      />


      <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{props.author}</b> {": "} {props.text}
          </Typography>
        </CardContent>
    </Card>
  );
}
