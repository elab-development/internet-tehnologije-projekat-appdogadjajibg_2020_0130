 
import React, { useState } from 'react';
import axios from 'axios';
import '../PocetnaStranica/HomePage.css';  
import InputField from './InputField';  

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', { 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation 
      });
      const { message } = response.data;
      alert(message);  
   
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} className="login-form">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <InputField
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <InputField
          id="passwordConfirmation"
          label="Confirm Password"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <div className="button-container">
          <button type="submit" className="appsLand-btn">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
