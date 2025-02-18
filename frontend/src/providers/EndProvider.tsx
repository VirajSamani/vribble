import { Backdrop, Box, Typography, Button, Divider } from "@mui/material";
import { useSocketContext } from "./SocketProvider";
import { useNavigate } from 'react-router-dom';

function EndProvider() {
  const {
    game: { isFinished, users },
  } = useSocketContext();

  const navigate = useNavigate();

  // Sort users by points in descending order
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <Backdrop
      open={isFinished}
      sx={{
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="white" mb={3}>
        Game Over
      </Typography>

      {/* Podium Layout: Display Top 3 Players with Distinct Styling */}
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* 1st place */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            position: 'relative',
            zIndex: 3,
            mb: 3,
            backgroundColor: 'gold',
            padding: 2,
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)',
            transform: 'scale(1.1)',
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="black">
            1st Place: {sortedUsers[0]?.userName}
          </Typography>
          <Typography variant="body1" color="black">
            Points: {sortedUsers[0]?.points}
          </Typography>
        </Box>

        {/* 2nd place */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            position: 'relative',
            zIndex: 2,
            mb: 2,
            backgroundColor: 'silver',
            padding: 2,
            borderRadius: '10px',
            boxShadow: '0 0 8px rgba(192, 192, 192, 0.6)',
            transform: 'scale(1)',
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="black">
            2nd Place: {sortedUsers[1]?.userName}
          </Typography>
          <Typography variant="body1" color="black">
            Points: {sortedUsers[1]?.points}
          </Typography>
        </Box>

        {/* 3rd place */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            position: 'relative',
            zIndex: 1,
            mb: 1,
            backgroundColor: 'bronze',
            padding: 2,
            borderRadius: '10px',
            boxShadow: '0 0 6px rgba(205, 127, 50, 0.6)',
            transform: 'scale(0.95)',
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="black">
            3rd Place: {sortedUsers[2]?.userName}
          </Typography>
          <Typography variant="body1" color="black">
            Points: {sortedUsers[2]?.points}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ width: '100%', mb: 2 }} />

      {/* Display other players normally */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        {sortedUsers.slice(3).map((user) => (
          <Box key={user.userId} display="flex" justifyContent="space-between" width="100%" mb={1}>
            <Typography variant="body1" color="white">
              {user.userName}
            </Typography>
            <Typography variant="body1" color="white">
              {user.points}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Optional Button to close or restart */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")} // Or navigate to another page
        sx={{ mt: 3, textTransform: "none" }}
      >
        Play Again
      </Button>
    </Backdrop>
  );
}

export default EndProvider;
