import { Backdrop } from "@mui/material";
import { useSocketContext } from "./SocketProvider";

function EndProvider() {
  const {
    game: { isFinished },
  } = useSocketContext();

  return (
    <Backdrop
      open={isFinished}
      sx={{
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      Game Over
    </Backdrop>
  );
}

export default EndProvider;
