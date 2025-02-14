import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import Games from "./Games";
import { MessageType } from "./constants";

const app = express();
const httpServer = app.listen(8080);
app.use(express.json());

const wss = new WebSocketServer({ server: httpServer });
const games = new Games();

wss.on("connection", function connection(ws: WebSocket) {
  ws.on("message", function message(data, isBinary) {
    const message = JSON.parse(data.toString());
    if (message.type === MessageType.INIT) {
      // add game
      games.addGame(message.roomCode, message.userId, message.userName, ws);

      // find game and send response to all users that some one joined the game
      const game = games.findGame(message.roomCode);
      if (game) {
        const currentCanvasPath = game.getcurrentCanvasPath();
        const users = game.Users.map((user) => ({
          userId: user.userId,
          userName: user.userName,
          isActive: user.isActive,
        }));
        const response = {
          type: MessageType.JOINED_ROOM,
          users: users,
          roomCode: message.roomCode,
        };

        const canvasResponse = {
          type: MessageType.REPLACE_PATH,
          roomCode: message.roomCode,
          path: currentCanvasPath,
        };
        game.Users.forEach((user) => {
          user.ws.send(JSON.stringify(response));
          user.ws.send(JSON.stringify(canvasResponse));
        });
      }
    }

    if (message.type === MessageType.GAME_STARTED) {
      const game = games.findGame(message.roomCode);
      if (!game) return;

      game.setCurrentUser();

      const wordList = game.gameWordList();

      const user = game.findUser(game.Users[0].userId);

      const response = {
        type: MessageType.SELECT_WORD,
        words: wordList,
        roomCode: message.roomCode,
      };

      user?.ws.send(JSON.stringify(response));

      game.Users.forEach((user) => {
        if (user.userId === message.userId) {
          return;
        }
        const responseForNonCurrentUser = {
          type: MessageType.SELECECTING_WORD,
          roomCode: message.roomCode,
          selectingUser: game.Users[0].userName,
        };
        user.ws.send(JSON.stringify(responseForNonCurrentUser));
      });
    }

    if (message.type === MessageType.DRAW) {
      const game = games.findGame(message.roomCode);
      if (!game) return;

      game.addCanvasPath(message.path);

      const response = {
        type: MessageType.DRAW,
        roomCode: message.roomCode,
        path: message.path,
      };

      game.Users.forEach((user) => {
        user.ws.send(JSON.stringify(response));
      });
    }

    if (message.type === MessageType.REPLACE_PATH) {
      const game = games.findGame(message.roomCode);
      if (!game) return;

      game.clearCanvas();

      const response = {
        type: MessageType.REPLACE_PATH,
        roomCode: message.roomCode,
        path: [],
      };

      game.Users.forEach((user) => {
        user.ws.send(JSON.stringify(response));
      });
    }

    if (message.type === MessageType.MESSAGE) {
      const game = games.findGame(message.roomCode);
      if (!game) return;

      // handler to check the word is guessed or not
      const isGuessed =
        game.guessWord(message.message, message.userId) || message.isGuessed;

      const response = {
        type: MessageType.MESSAGE,
        roomCode: message.roomCode,
        message: message.message,
        userId: message.userId,
        userName: message.userName,
      };

      const user = game.findUser(message.userId);
      if (user && isGuessed && !message.isGuessed) {
        const successResponse = {
          type: MessageType.GUESS_SUCCESS,
          roomCode: message.roomCode,
          userId: message.userId,
          userName: message.userName,
        };
        user.ws.send(JSON.stringify(successResponse));
      }

      game.Users.forEach((user) => {
        if (isGuessed) {
          if (!user.isGuessed && user.userId !== message.userId) {
            response.message = "User have guessed the word!";
          }
          user.ws.send(JSON.stringify(response));
          return;
        }
        user.ws.send(JSON.stringify(response));
      });
    }

    if(message.type === MessageType.SELECT_WORD) {
      const game = games.findGame(message.roomCode);
      if (!game) return;

      game.setWord(message.word);
     
      game.Users.forEach((user) => {
        user.ws.send(JSON.stringify({
          type: MessageType.START_ROUND,
          roomCode: message.roomCode,
          isDrawAllowed: user.userId === message.userId,
        }));
      });
    }
  });
});