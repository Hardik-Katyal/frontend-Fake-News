import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!username || !password) {
      setError("Both fields are required");
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/app");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 422) {
        setError("Invalid request format");
      } else if (error.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleLogin} className="login-form">
        <input
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isLoading}
        />
        
        <input
          className="input-field"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        
        <button className="submit-btn" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Logging in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      
      <p className="register-text">
        Don't have an account?{" "}
        <span 
          className="register-link" 
          onClick={() => !isLoading && navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;