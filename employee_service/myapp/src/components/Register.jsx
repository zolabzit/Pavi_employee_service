// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import './Style.css'; // Import the CSS file

function Register() {
  const [registerData, setRegisterData] = useState({ username: '', password: '', role: '' });
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', registerData);

      if (response.data.success) {
        setRegistrationStatus('success');
      } else {
        setRegistrationStatus('failure');
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <div>
        <label htmlFor="register-username">Username:</label>
        <input
          type="text"
          id="register-username"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="register-password">Password:</label>
        <input
          type="password"
          id="register-password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="register-role">Role:</label>
        <input
          type="text"
          id="register-role"
          value={registerData.role}
          onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
        />
      </div>
      <button onClick={handleRegister}>Register</button>

      {registrationStatus === 'failure' && (
        <p>Registration failed. Please try again.</p>
      )}

      {registrationStatus === 'success' && (
        <div>
          <p>Registration successful! Please <Link to="/login">login</Link> to continue.</p>
        </div>
      )}
    </div>
  );
}

export default Register;
