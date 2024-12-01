import React, { useState } from 'react';
import axios from 'axios';
import './RegisterUser.css';

const RegisterUser = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState(''); // Added address state
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = { 
        email, 
        userName: username, 
        phoneNumber, // Ensure this is sent as a string
        password, 
        address 
      };
      const response = await axios.post('http://localhost:8080/users/generateOtp', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.data || "Error occurred");
    } 
  };
  
  const handleOtpVerification = async () => {
    const data = {
      email,
      otp,
      userName: username, // Include username
      phoneNumber, // Ensure this is a string
      password, // Include password
      address, // Include address
    };
  
    try {
      const response = await axios.post('http://localhost:8080/users/verifyOtpAndSaveUser', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.data || "Error occurred");
    }
  };
  
  
  
  

  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
       <input
  type="text"
  placeholder="Phone Number"
  value={phoneNumber}
  onChange={(e) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  }}
/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address" // Added address input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Generate OTP</button>
      </form>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleOtpVerification}>Verify OTP</button>
      <p>{message}</p>
    </div>
  );
};

export default RegisterUser;
