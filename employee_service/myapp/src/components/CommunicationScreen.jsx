import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CommunicationScreen.css'; // Import your custom CSS file for styling

const CommunicationScreen = () => {
  const [text, setText] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [sentMessage, setSentMessage] = useState(null);

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/messages', { text, employeeId });
      console.log(response.data); // Log the response from the server
      toast.success('Message sent successfully', { position: 'bottom-right' });
      setSentMessage(text); // Store the sent message to display
      // Add any logic to handle the response if needed
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message', { position: 'bottom-right' });
      // Add any error handling logic here
    }
  };

  return (
    <div className="communication-screen">
      <h1>Communication Screen</h1>
      <div className="input-container">
        <input type="text" placeholder="Enter your message" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="text" placeholder="Enter employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      {/* Display the sent message */}
      {sentMessage && <p>Sent Message: {sentMessage}</p>}
      {/* Display the employee ID */}
      {employeeId && <p>Employee ID: {employeeId}</p>}
    </div>
  );
};

export default CommunicationScreen;
