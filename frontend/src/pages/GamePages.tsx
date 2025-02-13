import GameWindow from "../components/GameWindow";
import SocketProvider from "../providers/SocketProvider";

function GamePlay() {
  return (
    <SocketProvider>
      <GameWindow />
    </SocketProvider>
  );
}

export default GamePlay;
