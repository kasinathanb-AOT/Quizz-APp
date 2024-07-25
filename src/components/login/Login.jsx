import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData")) || [];
  const handleLogin = () => {
    console.log(username, password);
    userData.map((i) => {
      i.username == username && i.password === password
        ? navigate(`/index/${username}`)
        : "";
    });
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
