import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../services/userServices";
import BasicLoader from "../basicLoader/basicLoader";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!username || !password) {
      setError("Fill all the fields");
      setLoading(false);
    } else {
      const result = await UserLogin(username, password);
      setLoading(false)
      if (result.success) {
        navigate(`/index/${username}`);
      } else {
        setError(result.message || "An Error occurred during login...");
        setLoading(false)
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
      <p className="error">{error}</p>
      <button className="btn" onClick={handleLogin}>
        {loading ? <BasicLoader /> : "Login"}
      </button>
    </div>
  );
}

export default Login;
