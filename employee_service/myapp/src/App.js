import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
 
import Login from './components/Login';
import HelpAndSupport from './components/HelpAndSupport';
import Home from './components/Home'; // Import HomeScreen component
import Register from './components/Register';
 // Import your app-wide CSS file
 import './App.css';
function App() {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/register" color="inherit">Register</Button>
            <Button component={Link} to="/help" color="inherit">Help & Support</Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<HelpAndSupport />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
