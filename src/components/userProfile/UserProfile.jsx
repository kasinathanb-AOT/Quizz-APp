import React, { useState } from "react";
import "./userProfile.scss";

function UserProfile() {

  
  const [formData, setFormData] = useState({
    userName: "",
    passWord: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="userProfile">
      <div className="avatar"></div>
      <div className="data-container">
        <label>Username:</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
        />
      </div>
      <div className="data-container">
        <label>Password:</label>
        <input
          type="password"
          name="passWord"
          value={formData.passWord}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default UserProfile;
