import io from 'socket.io-client';

const socketUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000'; // Use environment variable for API URL

export const connectSocket = (onConnect, onMessageReceived) => {
  const socket = io(socketUrl);
  socket.on('connect', () => onConnect(socket.id));

  // Handle incoming messages
  socket.on('message', onMessageReceived);

  // Handle other events (notifications, announcements) as needed
  // ... (implement similar logic for handling notifications and announcements)

  // Handle socket disconnection (optional)
  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
    // Implement logic to handle disconnection (e.g., display a message)
  });

  return socket; // Optionally return the socket for further use
};
