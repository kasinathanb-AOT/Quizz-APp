import React from "react";
import './login.scss';

function Login() {
  return (
    <div className="login-form">
      <h1 className="login-header">Login</h1>
      <label>Username</label>
      <input className="login-input" type="text" name="username" id="username" />
      <label>Password</label>
      <input className="login-input" type="password" name="password" id="password" />
      <button className="btn">Login</button>
    </div>
  );
}

export default Login;
