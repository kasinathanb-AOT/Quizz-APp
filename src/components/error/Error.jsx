import React from "react";
import ErrorImg from "../../assets/6325254.jpg";
import "./error.scss";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>Oops! Something went wrong.</h1>
        <p>Sorry, the page you are looking for cannot be found.</p>
        <img src={ErrorImg} alt="Error illustration" className="error-image" />
        <button onClick={()=>navigate('/')} className="home-link">Go Back to Home</button>
      </div>
    </div>
  );
}

export default Error;