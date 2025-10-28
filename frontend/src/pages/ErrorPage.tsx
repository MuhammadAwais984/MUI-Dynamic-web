import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      px={1}
    >
        <img
            src="public/logos/error-404.png"
            alt="Page Not Found"
            style={{ maxWidth: "400px", width: "100%", marginBottom: "5px" }}
        />
      <Typography variant="h4" >
        404: The page you are looking for isn't here
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={1} mb={3}>
        You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Dashboard
      </Button>
    </Box>
  );
}
