import { io } from 'socket.io-client';

const socketUrl = import.meta.env.VITE_SOCKET_URL;

// Immediately initiate the handshake on first import.
// Adjust the URL if your backend is hosted elsewhere.
const socket = io(socketUrl || 'http://localhost:5000', {
  autoConnect: true,  // default is true, so this line is optional
});
// Log the URL being used for the Socket.IO connection.
console.log('Connecting Socket.IO to:', socketUrl || 'http://localhost:5000');
// Listen once for the built-in "connect" event to confirm the handshake.
socket.once('connect', () => {
  console.log('Socket.IO connected; socket.id =', socket.id);
});

// Handle disconnection globally.
socket.on('disconnect', (reason) => {
  console.log('Socket disconnected (reason):', reason);
});

// Export the single shared socket instance.
export default socket;
