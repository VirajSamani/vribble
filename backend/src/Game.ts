import { WebSocket } from "ws";
import User from "./User";

class Game {
  gameCode: string;
  Users: User[];
  currentCanvasPath: CanvasPath[] = [];
  gameWord: string = "word";
  gameStarted: boolean = false;
  currentUser: User | null = null;

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
      user.ws = ws;
      user.isActive = true;
      return;
    }
    this.Users.push(new User(userId, userName, ws));
  }

  findUser(userId: string) {
    return this.Users.find((user) => user.userId === userId);
  }

  addCanvasPath(path: CanvasPath) {
    this.currentCanvasPath.push(path);
  }

  getcurrentCanvasPath() {
    return this.currentCanvasPath;
  }

  clearCanvas() {
    this.currentCanvasPath = [];
  }

  guessWord(word: string, userId: string) {
    if (word === this.gameWord) {
      const user = this.findUser(userId);
      if (user) {
        user.isGuessed = true;
      }
      return true;
    }
    return false;
  }

  gameStart() {
    this.gameStarted = true;
  }

  setCurrentUser() {
    this.currentUser = this.Users[0];
  }

  gameWordList() {
    return ["word1", "word2", "word3", "word4", "word5"];
  }

  setWord(word: string) {
    this.gameWord = word;
  }
}

export default Game;
