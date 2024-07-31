import React, { useState } from "react";
import Login from "../../components/login/Login";
import SignUp from "../../components/signup/SignUp";
import "./auth.scss";
import studyGirl from "../../assets/sturdy-girl.svg";

function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1 className="auth-header">
          {isLogin ? "Welcome Back" : "Create an account to continue"}
        </h1>
        <button className="btn home-btn" onClick={toggleForm}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </div>
      <div className="auth-right">
        {isLogin ? <Login /> : <SignUp />}
        <img className="bg-img" src={studyGirl} />
      </div>
    </div>
  );
}

export default Auth;