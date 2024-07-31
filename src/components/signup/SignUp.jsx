import React, { useState } from "react";
import "./signup.scss"; // Make sure the path is correct
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const fetchUserData = () => {
    try {
      const storedUserData = localStorage.getItem("userData");
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
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    const usernameExists = userData.some((user) => user.username === formData.username);
    if (usernameExists) {
      newErrors.username = "Username already exists";
    }

    return newErrors;
  };

  const handleSignUp = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newUser = [...userData, formData];
    localStorage.setItem("userData", JSON.stringify(newUser));
    navigate(`/index/${formData.username}`);
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
      {errors.username && <p className="error">{errors.username}</p>}

      <label>Email</label>
      <input
        className="signup-input"
        type="text"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label>Password</label>
      <input
        className="signup-input"
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error">{errors.password}</p>}

      <button onClick={handleSignUp} className="btn">
        Signup
      </button>
    </div>
  );
}

export default SignUp;
