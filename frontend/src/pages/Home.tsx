import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { generateRandomString } from "../utils/text";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLocalStorageItem } from "../utils/localStorage";
import { useUser } from "../providers/User";

function Home() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const {
    user: { setUserName },
  } = useUser();
  const [rounds, setRounds] = useState('1');
  const handleCreateRoom = () => {
    const roomCode = generateRandomString(5);
    navigate("/game/" + roomCode, { state: { rounds: rounds } });
  };
  const handleJoinRoom = () => {
    navigate("/game/" + code);
  };
  return (
    <>
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Enter Nick Name"
          variant="outlined"
          inputProps={{ maxLength: 5 }}
          onChange={(e) => {
            setUserName(e.target.value);
            setLocalStorageItem("userName", e.target.value);
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="background.default"
        color="text.primary"
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
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: "8px",
                textTransform: "none",
                paddingX: "50px",
              }}
              onClick={handleJoinRoom}
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
            {/* select box for the number of rounds */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              mt={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Number of Rounds
              </Typography>
              <Select
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
                value={rounds}
                onChange={(e) => setRounds(e.target.value)}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
              </Select>
            </Box>
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
    </>
  );
}

export default Home;
