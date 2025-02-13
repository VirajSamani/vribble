import { WebSocket } from "ws";
import Game from "./Game";

class Games {
    games: Game[];

    constructor() {
        this.games = [];
    }

    addGame(roomCode: string, userId: string, userName: string, ws: WebSocket) {
        const game = this.findGame(roomCode)
        if (game) {
            game.addUser(userId, userName, ws);
            return;
        }
        this.games.push(new Game(roomCode, userId, userName, ws));
    }

    findGame(roomCode: string) {
        return this.games.find((game) => game.gameCode === roomCode);
    }
}

export default Games;