import { Backdrop, Button, Typography } from "@mui/material";
import { useSocketContext } from "./SocketProvider";

function SelectWordProvider() {
  const {
    game: { isStarted, isSelectWord, words, selectWord, userSelecting },
  } = useSocketContext();

  return (
    <Backdrop
      open={isStarted && isSelectWord}
      sx={{
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      {userSelecting && (
        <Typography>{userSelecting} is selecting...</Typography>
      )}
      {words?.map((word) => {
        return (
          <Button
            variant="outlined"
            key={word}
            onClick={() => selectWord(word)}
          >
            {word}
          </Button>
        );
      })}
    </Backdrop>
  );
}

export default SelectWordProvider;
