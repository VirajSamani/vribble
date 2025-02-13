import { Box, Button, TextField, Typography } from "@mui/material";
import { generateRandomString } from "../utils/text";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    const roomCode = generateRandomString(5);
    navigate("/game/" + roomCode);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
      color="text.primary"
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        maxWidth="900px"
        width="100%"
        padding={4}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Join a Room
          </Typography>
          <TextField
            label="Enter Code"
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 5 }}
          />
          <Button
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: "8px",
              textTransform: "none",
              paddingX: "50px",
            }}
          >
            Join
          </Button>
        </Box>

        <Box width="2px" height="100px" bgcolor="divider" mx={3} />

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Create a Room
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              borderRadius: "8px",
              textTransform: "none",
            }}
            onClick={handleCreateRoom}
          >
            Create Room
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
