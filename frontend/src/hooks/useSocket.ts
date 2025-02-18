import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageType } from "../utils/constants";
import { useUser } from "../providers/User";
import { CanvasPath } from "react-sketch-canvas";

export interface User {
  userId: string;
  userName: string;
  isActive: boolean;
  points: number;
}

export interface Message {
  userId: string;
  userName: string;
  message: string;
  isGuessed: boolean;
}

function useSocket() {
  const { roomCode } = useParams();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [paths, setPaths] = useState<CanvasPath[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [guessed, setGuessed] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isSelectWord, setIsSelectWord] = useState<boolean>(true);
  const [userSelecting, setUserSelecting] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [wordLength, setWordLength] = useState<number>(0);
  const [isYourTurn, setIsYourTurn] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { user } = useUser();

  const handleDraw = (updatedPath: CanvasPath) => {
    if (updatedPath.paths?.length <= 1) return;
    socket?.send(
      JSON.stringify({
        type: MessageType.DRAW,
        roomCode: roomCode,
        path: updatedPath,
      })
    );
  };

  const clearCanvas = () => {
    socket?.send(
      JSON.stringify({
        type: MessageType.REPLACE_PATH,
        roomCode: roomCode,
      })
    );
  };

  const sendMessage = (message: string) => {
    socket?.send(
      JSON.stringify({
        type: MessageType.MESSAGE,
        roomCode: roomCode,
        message: message,
        userId: user.userId,
        userName: user.userName,
        isGuessed: guessed,
      })
    );
  };

  const startGame = () => {
    socket?.send(
      JSON.stringify({
        type: MessageType.GAME_STARTED,
        roomCode: roomCode,
        userId: user.userId,
      })
    );
    setIsStarted(true);
  };

  const selectWord = (word: string) => {
    socket?.send(
      JSON.stringify({
        type: MessageType.SELECT_WORD,
        roomCode: roomCode,
        word: word,
        userId: user.userId,
      })
    );
    setWords([]);
  };

  useEffect(() => {
    if (!roomCode || !user.userId || !user.userName) {
      return;
    }

    const ws = new WebSocket("ws://192.168.29.197:8080");

    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: MessageType.INIT,
          roomCode: roomCode,
          userId: user.userId,
          userName: user.userName,
        })
      );
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === MessageType.JOINED_ROOM) {
        setUsers(message.users);
      }

      if (message.type === MessageType.DRAW) {
        setPaths((prevPaths) => [...prevPaths, message.path]);
      }

      if (message.type === MessageType.REPLACE_PATH) {
        setPaths(message.path);
      }

      if (message.type === MessageType.MESSAGE) {
        setMessages((prevMessages) => [message, ...prevMessages]);
      }

      if (message.type === MessageType.GUESS_SUCCESS) {
        setGuessed(true);
        setMessages((prevMessages) => [
          {
            message: "You have guessed the word!",
            userId: message.userId,
            userName: user.userName,
            isGuessed: true,
          },
          ...prevMessages,
        ]);
      }

      if (message.type === MessageType.SELECT_WORD) {
        setWords(message.words);
        setIsStarted(true);
        setIsSelectWord(true);
      }

      if (message.type === MessageType.SELECECTING_WORD) {
        setUserSelecting(message.selectingUser);
        setIsStarted(true);
        setIsSelectWord(true);
      }

      if (message.type === MessageType.START_ROUND) {
        setIsYourTurn(message.isDrawAllowed);
        setIsSelectWord(false);
        setWord(message.word);
        setWordLength(message.wordLength);
        setGuessed(false);
        setUserSelecting("");
      }

      if (message.type === MessageType.END_ROUND) {
        setIsFinished(true);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  }, [roomCode, user.userId, user.userName]);

  return {
    socket,
    users,
    setUsers,
    handleDraw,
    paths,
    clearCanvas,
    sendMessage,
    messages,
    words,
    selectWord,
    startGame,
    isStarted,
    isSelectWord,
    word,
    wordLength,
    userSelecting,
    isYourTurn,
    isFinished,
  };
}

export default useSocket;
