import React, { useState } from 'react';
import { emitMessage } from '../services/socket'; // Import socket service

const MessageInput = ({ userId }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      emitMessage({ content: message, senderId: userId }); // Emit message to server
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
