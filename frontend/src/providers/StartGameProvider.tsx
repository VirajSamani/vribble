import { Backdrop, Button, Typography } from "@mui/material";
import { useSocketContext } from "./SocketProvider";
import { useUser } from "./User";

function StartGameProvider() {
  const {
    game: { isStarted, startGame, users },
  } = useSocketContext();

  const { user } = useUser();

  const isOwner = users[0]?.userId === user.userId;

  return (
    <Backdrop
      open={!isStarted}
      sx={{
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      {isOwner ? (
        <Button variant="contained" onClick={startGame}>
          Start Game
        </Button>
      ) : (
        <Typography>Waiting to Start....</Typography>
      )}
    </Backdrop>
  );
}

export default StartGameProvider;
