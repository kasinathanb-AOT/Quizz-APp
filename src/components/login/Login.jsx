import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../services/userServices";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    if (!username || !password) setError("Fill all the fields");

    if (!username) setError("Username is required");

    if (!password) setError("Password is missing");
    else {
      const response = await UserLogin(username, password);
      if (response) {
        navigate(`/index/${response}`);
      }
    }
  };

  return (
    <div className="login-form">
      <h1 className="login-header">Login</h1>
      <label>Username</label>
      <input
        className="login-input"
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => {
          e.preventDefault();
          setUserName(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        className="login-input"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => {
          e.preventDefault();
          setPassword(e.target.value);
        }}
      />
      <button className="btn" onClick={() => handleLogin()}>
        Login
      </button>
    </div>
  );
}

export default Login;
