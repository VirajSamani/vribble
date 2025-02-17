import GameWindow from "../components/GameWindow";
import EndProvider from "../providers/EndProvider";
import SelectWordProvider from "../providers/SelectWordProvide";
import SocketProvider from "../providers/SocketProvider";
import StartGameProvider from "../providers/StartGameProvider";

function GamePlay() {
  return (
    <SocketProvider>
      <StartGameProvider />
      <SelectWordProvider />
      <EndProvider />
      <GameWindow />
    </SocketProvider>
  );
}

export default GamePlay;
