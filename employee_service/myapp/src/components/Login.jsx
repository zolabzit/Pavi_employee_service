import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Dashboard from './Dashboard';
import './Style.css'; // Import the CSS file

function Login() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', loginData);

      if (response.data.success) {
        setLoginStatus('success');
      } else {
        setLoginStatus('failure');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  if (loginStatus === 'success') {
    return <Dashboard />;
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
      </div>
      <button onClick={handleLogin}>Login</button>

      {loginStatus === 'failure' && (
        <p className="failure">Login failed. Incorrect username or password.</p>
      )}

      {/* Link to register page */}
      <p>Not registered yet? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
