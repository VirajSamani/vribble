import { useEffect, useRef } from "react";
import {
  CanvasPath,
  ReactSketchCanvas,
  ReactSketchCanvasRef,
} from "react-sketch-canvas";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

interface SketchCanvasProps {
  handleChange: (updatedPath: CanvasPath) => void;
  paths: CanvasPath[];
}

const SketchCanvas = ({ handleChange, paths }: SketchCanvasProps) => {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.loadPaths(paths);
    }
  }, [paths]);

  return (
    <ReactSketchCanvas
      ref={canvasRef}
      style={styles}
      width="400px"
      height="400px"
      strokeWidth={4}
      strokeColor="red"
      onStroke={handleChange}
    />
  );
};

export default SketchCanvas;
