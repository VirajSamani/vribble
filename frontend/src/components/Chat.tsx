import { Box, Typography, TextField, Button, useTheme } from "@mui/material";
import { useState } from "react";
import { useSocketContext } from "../providers/SocketProvider";
import { useUser } from "../providers/User";

export default function Chat() {
  const theme = useTheme();
  const { user } = useUser();
  const {
    game: { messages, sendMessage },
  } = useSocketContext();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          width: "90%",
          height: { xs: 200, sm: 200, md: 450 },
          borderRadius: 3,
          border: `2px solid ${theme.palette.text.primary}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column-reverse",
            overflowY: "auto",
          }}
        >
          {messages.map((msg, index) => (
            <Typography
              key={index}
              sx={{
                fontFamily: "Comic Sans MS, cursive",
                fontSize: "14px",
                mb: 1,
              }}
            >
              {msg.message} - (
              {msg.userId === user.userId ? "You" : msg.userName})
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Guess the word"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontFamily: "Comic Sans MS, cursive",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            sx={{
              fontFamily: "Comic Sans MS, cursive",
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
