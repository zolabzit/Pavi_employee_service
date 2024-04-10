// MessageSender.jsx
import React, { useState } from 'react';
import axios from 'axios';

function MessageSender({ onMessageSent }) {
  const [message, setMessage] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const handleMessageSend = async () => {
    try {
      // Send the message to the server
      await axios.post('http://localhost:3001/api/messages', { text: message, employeeId });
      // Clear the message input
      setMessage('');
      // Clear the employee ID input
      setEmployeeId('');
      // Notify parent component that message has been sent
      if (onMessageSent) {
        onMessageSent();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h3>Send Message</h3>
      <label htmlFor="employeeId">Employee ID:</label>
      <input
        type="text"
        id="employeeId"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        placeholder="Enter employee ID"
      />
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        required
      ></textarea>
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
}

export default MessageSender;
