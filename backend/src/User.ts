import { WebSocket } from "ws";

class User {
    userId: string;
    userName: string;
    isActive: boolean;
    ws: WebSocket;
    isGuessed: boolean = false;
    points: number = 0;

    constructor(userId: string, userName: string, ws: WebSocket) {
        this.userId = userId;
        this.userName = userName;
        this.isActive = true;
        this.ws = ws;
    }
}

export default User;