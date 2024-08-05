import axios from "axios";
import { BASE_URL } from "./api";

const API_BASE_URL = BASE_URL;

// Api for user Signup
export const UserSignup = async (userData) => {
  const { username, email, password } = userData;
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, {
      username,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log("Signup error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Signup failed",
    };
  }
};

// Api for user Login
export const UserLogin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      userName: username,
      password,
    });
    const token = response.data.message;
    localStorage.setItem("authToken", token);
    return token;
  } catch (error) {
    console.log("Login Error", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login Failed",
    };
  }
};
