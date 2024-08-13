import axios from "axios";
import { BASE_URL } from "./api";

const API_BASE_URL = BASE_URL;
const authToken = localStorage.getItem("authToken");

// API for user signup
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

// API for user login
export const UserLogin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      userName: username,
      password,
    });
    localStorage.setItem("authToken", authToken);
    return {
      success: true,
      token: authToken,
    };
  } catch (error) {
    console.log("Login Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login Failed",
    };
  }
};

// Fetching the quiz data
export const fetchQuizData = async (level) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/quiz/questions/${level}`,
      {
        headers: {
          Authorization: `${authToken}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching quiz data:", error);
    console.log("Error response data:", error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch quiz data",
    };
  }
};

// Get all the users
export const getLeaderBoard = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/show`, {
      headers: {
        Authorization: `${authToken}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching the leaderboard...!", error);
    return [];
  }
};

// Update user's score in the database
export const updateUserScore = async (userName, score) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/updateScore`,
      {
        userName,
        score,
      },
      {
        headers: {
          Authorization: `${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error updating user score...!", error);
  }
};