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
      console.log("--------------");
      if (game) {
        console.log("SEnd");
        const users = game.Users.map((user) => ({
          userId: user.userId,
          userName: user.userName,
          isActive: user.isActive,
        }));
        console.log("SEnd2");
        const response = {
          type: MessageType.JOINED_ROOM,
          users: users,
          roomCode: message.roomCode,
        };
        console.log("SEnd3");
        game.Users.forEach((user) => {
          user.ws.send(JSON.stringify(response));
        });
        console.log("SEnd4");
      }
    }
  });
});
