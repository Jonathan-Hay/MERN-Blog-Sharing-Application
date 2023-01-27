import * as React from "react";

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
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            "jh"
          </Avatar>
        }
        action={
          ("isAuthor"==="isAuthor") && (
            <Box display="flex">
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
        image="https://www.denofgeek.com/wp-content/uploads/2022/08/The-Lord-of-the-Rings-Fellowship-movie-poster.jpg?resize=768%2C432"
        title="green iguana"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read</Button>
      </CardActions>
    </Card>
  );
}
