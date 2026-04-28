import { io } from "socket.io-client";

const BASE_URL = process.env.REACT_APP_BACKEND;

const socket = io(BASE_URL, {
  withCredentials: true,
  transports: ["websocket"], // important for Render
});

export default socket;