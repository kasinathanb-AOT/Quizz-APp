import React, { useState } from "react";
import "./signup.scss";
import { useNavigate } from "react-router-dom";
import { UserSignup } from "../../services/userServices";
import { validateForm } from "../../utils/formValidations";

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
      return Array.isArray(JSON.parse(storedUserData))
        ? JSON.parse(storedUserData)
        : [];
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

  const handleSignUp = async () => {
    const validationErrors = validateForm(formData, userData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = await UserSignup(formData);
    if (response.data.authToken) {
      navigate(`/index/${response.data.authToken}`);
    } else {
      setErrors({ general: response.data });
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