import React, { useState } from "react";
import "./signup.scss";
import { useNavigate } from "react-router-dom";
import { UserSignup } from "../../services/userServices";
import BasicLoader from "../basicLoader/basicLoader";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await UserSignup(formData);
      setLoading(false);
      if (response.data.authToken) {
        navigate(`/index/${formData.username}`);
      } else {
        setError(response.message || "Signup failed");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || "An error occurred during signup");
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
        {loading ? <BasicLoader /> : "Sign up"}
      </button>
    </div>
  );
}

export default SignUp;
