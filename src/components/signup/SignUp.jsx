import React, { useState } from "react";
import "./signup.scss"; // Fixed typo: "singup" to "signup"
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Fetch userData from local storage and ensure it's an array
  const fetchUserData = () => {
    try {
      const storedUserData = localStorage.getItem("userData");
      // Ensure that storedUserData is a valid array
      return Array.isArray(JSON.parse(storedUserData)) ? JSON.parse(storedUserData) : [];
    } catch (e) {
      console.error("Error parsing userData from local storage:", e);
      return [];
    }
  };

  const userData = fetchUserData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = () => {
    const { username, email, password } = formData;

    // Validation check
    if (!username || !email || !password) {
      setError("Please fill all the fields");
      return; // Exit early if validation fails
    }

    // Check if the username already exists
    const usernameExists = userData.some((user) => user.username === username);
    if (usernameExists) {
      setError("Username already exists");
      return; // Exit early if username already exists
    }

    // Clear error and add new user
    setError("");
    const newUser = [...userData, { username, email, password }];
    localStorage.setItem("userData", JSON.stringify(newUser));
    navigate(`/index/${username}`);
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
