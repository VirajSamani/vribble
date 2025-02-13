import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageType } from "../utils/constants";
import { useUser } from "../providers/User";

export interface User {
  userId: string;
  userName: string;
  isActive: boolean;
}

function useSocket() {
  const { roomCode } = useParams();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: MessageType.INIT,
          roomCode: roomCode,
          userId: user.userId,
          userName: user.userName,
        })
      );
    };

    ws.onmessage = (event) => {
      console.log("Message received from server:", event.data);
      const message = JSON.parse(event.data);

      if (message.type === MessageType.JOINED_ROOM) {
        setUsers(message.users);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    return () => ws.close();
  }, [roomCode, user.userId, user.userName]);

  return { socket, users, setUsers };
}

export default useSocket;
