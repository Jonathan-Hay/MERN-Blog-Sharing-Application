import { Box, Container, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import Header from "./Header";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something has went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource you are looking for.";
  }

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Typography variant="h3">{title}</Typography>
          <Typography mt={5} variant="h4">{message}</Typography>
        </Box>
      </Container>
    </>
  );
}

export default ErrorPage;
