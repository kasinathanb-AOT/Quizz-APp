import React from "react";
import { useNavigate } from "react-router-dom";
import Hat from "../../assets/logo.png";
import "./navbar.scss"

function Navbar({username}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={Hat} />
        <p>{username}</p>
      </div>
      <div className="btn-container">
        <button onClick={() => handleLogout()} className="btn logout ">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;