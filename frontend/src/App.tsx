import { RouterProvider } from "react-router-dom";
import "./App.css";
import ThemeToggleButton from "./components/ThemeToggleButton";
import ThemeProviderWrapper from "./providers/ThemeProvider";
import router from "./router";
import { UserProvider } from "./providers/User";

function App() {
  return (
    <UserProvider>
      <ThemeProviderWrapper>
        <ThemeToggleButton />
        <RouterProvider router={router} />
      </ThemeProviderWrapper>
    </UserProvider>
  );
}

export default App;
