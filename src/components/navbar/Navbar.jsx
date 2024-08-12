import React from "react";
import { useNavigate } from "react-router-dom";
import Hat from "../../assets/logo.png";
import "./navbar.scss";

function Navbar({ username, onclick }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const userProfile = () => {
    onclick();
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img onClick={() => userProfile()} src={Hat} />
      </div>
      <div className="btn-container">
        <button onClick={() => handleLogout()} className="btn logout ">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;