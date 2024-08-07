import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../services/userServices";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const handleLogin = () => {
    if (!username || !password) setError("Fill all the fields");

    else {
      UserLogin(username, password)
        .then(navigate(`/index/${username}`))
        .catch((error) => {
          setError("An Error occured during login...");
        });
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
      <p className="error">{error}</p>

      <button className="btn" onClick={() => handleLogin()}>
        Login
      </button>
    </div>
  );
}

export default Login;