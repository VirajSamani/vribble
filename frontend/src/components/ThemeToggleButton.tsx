import { IconButton } from "@mui/material";
import { useThemeContext } from "../providers/ThemeProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const ThemeToggleButton = () => {
    const { toggleTheme, mode } = useThemeContext();
    return (
      <IconButton onClick={toggleTheme} sx={{ position: "absolute", top: 16, right: 16 }}>
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    );
  };
  

export default ThemeToggleButton;
