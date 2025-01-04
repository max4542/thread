import { io } from 'socket.io-client';

const socket = io('http://localhost:5050');  // Connect to the server

export default socket;