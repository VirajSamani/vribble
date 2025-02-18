import { WebSocket } from "ws";
import User from "./User";
import { MessageType } from "./constants";
import { getFiveRandomWords } from "./words";

export function getTimeLeft(timeout: any) {
  return Math.ceil(
    (timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000
  );
}

class Game {
  gameCode: string;
  Users: User[];
  currentCanvasPath: CanvasPath[] = [];
  gameWord: string = "";
  gameStarted: boolean = false;
  currentUser: User | null = null;
  currentUserIndex: number = 0;
  timeout: NodeJS.Timeout | null = null;

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

    const response = {
      type: MessageType.REPLACE_PATH,
      roomCode: this.gameCode,
      path: [],
    };

    this.Users.forEach((user) => {
      user.ws.send(JSON.stringify(response));
    });
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
    return getFiveRandomWords();
  }

  setWord(word: string) {
    this.gameWord = word;
  }

  isAllUserGussedWord() {
    const usersExcludedCurrentUser = this.Users.filter(
      (user) => user.userId !== this.currentUser?.userId
    );
    return usersExcludedCurrentUser.every((user) => user.isGuessed);
  }

  startRound() {
    this.clearCanvas();

    this.Users.forEach((user) => {
      user.isGuessed = false;
    });
    if (this.currentUserIndex === this.Users.length - 1) {
      this.currentUserIndex = 0;
      const response = {
        type: MessageType.END_ROUND,
        roomCode: this.gameCode,
      };
      this.Users.forEach((user) => {
        user.ws.send(JSON.stringify(response));
      });
      return;
    }
    this.currentUserIndex = this.currentUserIndex + 1;
    this.currentUser = this.Users[this.currentUserIndex];

    const wordList = this.gameWordList();

    const response = {
      type: MessageType.SELECT_WORD,
      words: wordList,
      roomCode: this.gameCode,
    };

    this.currentUser?.ws.send(JSON.stringify(response));

    this.Users.forEach((user) => {
      if (user.userId === this.currentUser?.userId) {
        return;
      }
      const responseForNonCurrentUser = {
        type: MessageType.SELECECTING_WORD,
        roomCode: this.gameCode,
        selectingUser: this.Users[this.currentUserIndex].userName,
      };
      user.ws.send(JSON.stringify(responseForNonCurrentUser));
    });
  }

  endRound() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const userHaveGuessed = this.Users.filter((user) => user.isGuessed).length;
    const points = Math.floor(100 / this.Users.length) * userHaveGuessed;
    if (this.currentUser) {
      this.currentUser.points = this.currentUser?.points + points;
    }
    this.startRound();
  }
}

export default Game;
