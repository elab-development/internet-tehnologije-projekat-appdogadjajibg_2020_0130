 
import React, { useState } from 'react';
import axios from 'axios';
import '../PocetnaStranica/HomePage.css';  
import InputField from './InputField';  

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('ernser.rodger@example.org');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      const { access_token, user } = response.data;
      sessionStorage.setItem('token', access_token);
      setUser(user);
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button type="submit" className="appsLand-btn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
