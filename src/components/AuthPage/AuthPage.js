import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./auth-page-styles.css";
import { UserContext } from "../AuthenticationUtils/UserContext";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  const [registrationMessage, setregistrationMessage] = useState('');

  const toggleAuthPage = () => {
    setregistrationMessage('')
    setIsLogin(!isLogin);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5273/api/Authentication/Login', { email, password });
      // Assume response contains the user object and token
      const token = response.data;
      localStorage.setItem('token', token.token); // Save the token for future requests
      setUser(email); // Save the user globally
      navigate('/contactList');
    } catch (err) {
      console.log(err)
      setError('Invalid credentials');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Registering the user");
      console.log(username, email. password);
      const response = await axios.post('http://localhost:5273/api/Authentication/Register?role=Admin', {
        username,email,password
      });
      setregistrationMessage('A link has been sent to the entered email id. Please open the email and click on the link to verify your registration. And login after that.')
      setUserName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="toggle-container">
        <button
          onClick={toggleAuthPage}
          className={isLogin ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={toggleAuthPage}
          className={!isLogin ? "active" : ""}
        >
          Register
        </button>
      </div>

      {/* Render Login or Registration Form */}
      {isLogin ? (
        // Use the Login form code here
        <div className="form-container">
  <h2 className="auth-page-heading">Login</h2>
  <form onSubmit={handleLogin}>
    <div className="form-field">
      <label className="auth-page-label">Email:</label>
      <input className="auth-page-input"  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
    </div>
    <div className="form-field">
      <label className="auth-page-label">Password:</label>
      <input className="auth-page-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
    </div>
    <button className="auth-page-button" type="submit">Login</button>
    {error && <p>{error}</p>}
  </form>
</div>

      ) : (
        // Use the Registration form code here
        <div className="form-container">
  <h2 className="auth-page-heading">Register</h2>
  <form onSubmit={handleRegister}>
    <div className="form-field">
      <label className="auth-page-label">Username:</label>
      <input className="auth-page-input" type="text" value={username} onChange={(e) => setUserName(e.target.value)}  placeholder="Enter your username" required />
    </div>
    <div className="form-field">
      <label className="auth-page-label">Email:</label>
      <input className="auth-page-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Enter your email" required />
    </div>
    <div className="form-field">
      <label className="auth-page-label">Password:</label>
      <input className="auth-page-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your password" required />
    </div>
    <button className="auth-page-button" type="submit">Register</button>
    {registrationMessage && <p>{registrationMessage}</p>}
  </form>
</div>

      )}
    </div>
  );
};

export default AuthPage;
