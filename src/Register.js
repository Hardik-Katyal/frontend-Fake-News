import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
  
    // Add basic validation
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
  
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        { 
          username: username,
          email: email,
          password: password 
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );
  
      if (response.data.message === "Registration successful") {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.detail || "Registration failed. Please try again.");
    }
  };
  
  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleRegister} className="register-form">
        <input
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="input-field"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-field"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="submit-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;