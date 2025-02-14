import { createContext, useContext } from "react";
import useSocket, { Message, User } from "../hooks/useSocket";
import { CanvasPath } from "react-sketch-canvas";
import FullPageLoader from "../components/FullPageLoader";

interface SocketContextType {
  socket: WebSocket | null;
  game: {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    handleDraw: (updatedPath: CanvasPath) => void;
    paths: CanvasPath[];
    clearCanvas: () => void;
    sendMessage: (message: string) => void;
    messages: Message[];
    words: string[];
    selectWord: (word: string) => void;
    isStarted: boolean;
    isSelectWord: boolean;
    startGame: () => void;
    userSelecting: string;
    isYourTurn: boolean;
  };
}

const defaultSocketContext: SocketContextType = {
  socket: null,
  game: {
    users: [],
    setUsers: () => {},
    handleDraw: () => {},
    paths: [],
    clearCanvas: () => {},
    sendMessage: () => {},
    messages: [],
    words: [],
    selectWord: () => {},
    isStarted: false,
    isSelectWord: false,
    startGame: () => {},
    userSelecting: "",
    isYourTurn: false,
  },
};

const SocketContext = createContext<SocketContextType>(defaultSocketContext);

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocketContext must be used within SocketProvider");
  return context;
}

function SocketProvider({ children }: { children: React.ReactNode }) {
  const {
    socket,
    users,
    setUsers,
    handleDraw,
    paths,
    clearCanvas,
    sendMessage,
    messages,
    words,
    selectWord,
    isStarted,
    isSelectWord,
    startGame,
    userSelecting,
    isYourTurn,
  } = useSocket();

  return (
    <SocketContext.Provider
      value={{
        socket,
        game: {
          users,
          setUsers,
          handleDraw,
          paths,
          clearCanvas,
          sendMessage,
          messages,
          words,
          selectWord,
          isStarted,
          isSelectWord,
          startGame,
          userSelecting,
          isYourTurn,
        },
      }}
    >
      <FullPageLoader open={socket === null} />
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
