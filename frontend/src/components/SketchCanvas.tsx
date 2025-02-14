import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  CanvasPath,
  ReactSketchCanvas,
  ReactSketchCanvasRef,
} from "react-sketch-canvas";
import blackBoard from "../assets/black-board.png";
import { useSocketContext } from "../providers/SocketProvider";

const SketchCanvas = ({
  handleChange,
  paths,
  clearCanvas,
}: {
  handleChange: (updatedPath: CanvasPath) => void;
  paths: CanvasPath[];
  clearCanvas: () => void;
}) => {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const theme = useTheme();
  const [strokeColor, setStrokeColor] = useState("#FFFFFF");
  const {
    game: { isYourTurn },
  } = useSocketContext();

  useEffect(() => {
    if (canvasRef.current) {
      if (paths.length === 0) {
        canvasRef.current.clearCanvas();
        return;
      }
      canvasRef.current.loadPaths(paths);
    }
  }, [paths]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
      }}
    >
      <ReactSketchCanvas
        ref={canvasRef}
        style={{
          borderRadius: "8px",
          overflow: "hidden",
        }}
        width="90%"
        height="400px"
        strokeWidth={4}
        strokeColor={isYourTurn ? strokeColor : "transparent"}
        backgroundImage={blackBoard}
        onStroke={isYourTurn ? handleChange : () => {}}
      />

      {isYourTurn && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography fontSize={14} fontWeight="bold">
              Pick a Color:
            </Typography>
            <TextField
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              sx={{
                width: "50px",
                height: "40px",
                borderRadius: "8px",
                border: `2px solid ${theme.palette.divider}`,
                backgroundColor: "transparent",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  transform: "scale(1.1)",
                },
              }}
              inputProps={{
                style: { cursor: "pointer", padding: 0, border: "none" },
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              fontSize: "14px",
              padding: "6px 16px",
              backgroundColor: theme.palette.error.main,
              "&:hover": { backgroundColor: theme.palette.error.dark },
            }}
            onClick={clearCanvas}
          >
            Clear Canvas
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SketchCanvas;
