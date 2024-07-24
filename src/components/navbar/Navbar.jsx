import React from "react";
import { useNavigate } from "react-router-dom";
import Hat from "../../assets/hat.png";
import "./navbar.scss"

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={Hat} />
      </div>
      <div className="btn-container">
        <button onClick={() => handleLogout()} className="btn logout ">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;