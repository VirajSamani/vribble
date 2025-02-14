import { Box, Typography } from "@mui/material";
import { useSocketContext } from "../providers/SocketProvider";

function Header() {
  const {
    game: { word, wordLength },
  } = useSocketContext();

  return (
    <Box display="flex" justifyContent="center">
      <Typography>
        {word
          ? word
          : Array.from({ length: wordLength })
              .map(() => "_")
              .join(" ")}
      </Typography>
    </Box>
  );
}

export default Header;
