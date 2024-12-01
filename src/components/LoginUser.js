import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginUser({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send login request to backend
    axios.get('http://localhost:8080/users', {
      params: {
        email: email,
        password: password
      }
    })
    .then(response => {
      if (response.status === 200) {
        // Successful login
        onLogin();  // Call onLogin() function after successful login
        navigate('/home');  // Navigate to the home page
      } else {
        alert('Invalid credentials');
      }
    })
    .catch(error => {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default LoginUser;
