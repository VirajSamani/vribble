import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect } from "react";

const FullPageLoader = ({ open }: { open: boolean }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Re-enable scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [open]);

  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark background
      }}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default FullPageLoader;
