import GameWindow from "../components/GameWindow";
import SelectWordProvider from "../providers/SelectWordProvide";
import SocketProvider from "../providers/SocketProvider";
import StartGameProvider from "../providers/StartGameProvider";

function GamePlay() {
  return (
    <SocketProvider>
      <StartGameProvider />
      <SelectWordProvider />
      <GameWindow />
    </SocketProvider>
  );
}

export default GamePlay;
