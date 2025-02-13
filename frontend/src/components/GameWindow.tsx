import { useSocketContext } from "../providers/SocketProvider";
import UserList from "./UserList";

function GameWindow() {
  const { socket } = useSocketContext();

  if (!socket) return <>Loading...</>;

  return (
    <>
      <UserList />asdfkj
    </>
  );
}

export default GameWindow;
