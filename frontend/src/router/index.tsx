import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import GamePlay from "../pages/GamePages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game/:roomCode",
    element: <GamePlay />,
  },
  {
    path: "*",
    element: <div>404 - Not Found</div>,
  },
]);

export default router;
