import { Grid2 } from "@mui/material";
import { useSocketContext } from "../providers/SocketProvider";
import UserList from "./UserList";
import SketchCanvas from "./SketchCanvas";
import Chat from "./Chat";
import Header from "./Header";

function GameWindow() {
  const {
    socket,
    game: { handleDraw, paths, clearCanvas },
  } = useSocketContext();

  if (!socket) return <>Loading...</>;

  return (
    <Grid2 container spacing={2} columns={12} sx={{ paddingTop: 10 }}>
      <Grid2 size={12}><Header /></Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <SketchCanvas
          handleChange={handleDraw}
          paths={paths}
          clearCanvas={clearCanvas}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 3 }}>
        <Chat />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 3 }}>
        <UserList />
      </Grid2>
    </Grid2>
  );
}

export default GameWindow;
