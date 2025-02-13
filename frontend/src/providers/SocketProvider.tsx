import { createContext, useContext } from "react";
import useSocket, { User } from "../hooks/useSocket";

interface SocketContextType {
  socket: WebSocket | null;
  game : {
    users: User[],
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
  }
}

const defaultSocketContext: SocketContextType = {
  socket: null,
  game : {
    users: [],
    setUsers: () => {}
  }
};

const SocketContext = createContext<SocketContextType>(defaultSocketContext);

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocketContext must be used within SocketProvider");
  return context;
}

function SocketProvider({ children }: { children: React.ReactNode }) {
  const { socket, users, setUsers } = useSocket();

  return (
    <SocketContext.Provider value={{ socket, game: { users, setUsers } }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
