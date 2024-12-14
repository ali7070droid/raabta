import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./auth-page-styles.css";
import { UserContext } from "../AuthenticationUtils/UserContext";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

  const toggleAuthPage = () => {
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
  <h2>Login</h2>
  <form onSubmit={handleLogin}>
    <div className="form-field">
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
    </div>
    <div className="form-field">
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
    </div>
    <button type="submit">Login</button>
    {error && <p>{error}</p>}
  </form>
</div>

      ) : (
        // Use the Registration form code here
        <div className="form-container">
  <h2>Register</h2>
  <form>
    <div className="form-field">
      <label>Username:</label>
      <input type="text" name="username" placeholder="Enter your username" required />
    </div>
    <div className="form-field">
      <label>Email:</label>
      <input type="email" name="email" placeholder="Enter your email" required />
    </div>
    <div className="form-field">
      <label>Password:</label>
      <input type="password" name="password" placeholder="Enter your password" required />
    </div>
    <button type="submit">Register</button>
  </form>
</div>

      )}
    </div>
  );
};

export default AuthPage;
