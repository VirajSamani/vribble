import { WebSocket } from "ws";
import User from "./User";

class Game {
  gameCode: string;
  Users: User[];

  constructor(
    gameCode: string,
    userId: string,
    userName: string,
    ws: WebSocket
  ) {
    this.gameCode = gameCode;
    this.Users = [new User(userId, userName, ws)];
  }

  addUser(userId: string, userName: string, ws: WebSocket) {
    const user = this.findUser(userId);
    if (user) {
      // user.isActive = true;
      return;
    }
    this.Users.push(new User(userId, userName, ws));
  }

  findUser(userId: string) {
    return this.Users.find((user) => user.userId === userId);
  }
}

export default Game;
