import React, { useState } from "react";
import "./singup.scss";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignUp = () => {
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      setError("Please fill all the fields");
    } else {
      setError("");
      localStorage.setItem("userData", JSON.stringify(formData));
      navigate(`/index/${formData.username}`);
    }
  };

  return (
    <div className="signup-form">
      <h1 className="signup-header">Signup</h1>
      <label>Username</label>
      <input
        className="signup-input"
        type="text"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label>Email</label>
      <input
        className="signup-input"
        type="text"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label>Password</label>
      <input
        className="signup-input"
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleSignUp} className="btn">
        Signup
      </button>
    </div>
  );
}

export default SignUp;
