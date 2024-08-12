import axios from "axios";
import { BASE_URL } from "./api";

const API_BASE_URL = BASE_URL;

// Api for user Signup
export const UserSignup = (userData) => {
  const { username, email, password } = userData;
  return axios
    .post(`${API_BASE_URL}/user/signup`, {
      username,
      email,
      password,
    })
    .then((response) => response)
    .catch((error) => {
      console.log("Signup error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    });
};

// API for user login
export const UserLogin = (username, password) => {
  return axios
    .post(`${API_BASE_URL}/user/login`, {
      userName: username,
      password,
    })
    .then((response) => {
      const token = response.data.authToken;
      localStorage.setItem("authToken", token);
      return {
        success: true,
        token,
      };
    })
    .catch((error) => {
      console.log("Login Error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login Failed",
      };
    });
};

// Fetching the quiz Data
export const fetchQuizData = (level) => {
  return axios
    .get(`${API_BASE_URL}/quiz/questions/${level}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error fetching quiz data:", error);
      console.log("Error response data:", error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch quiz data",
      };
    });
};

// get all the users
export const getLeaderBoard = () => {
  return axios
    .get(`${API_BASE_URL}/user/show`)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error fetching the leaderboard...!", error);
      return [];
    });
};

// Update user's score in the database
export const updateUserScore = (userName, score) => {
  return axios
    .put(`${API_BASE_URL}/user/updateScore`, { userName, score })
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error updating user score...!", error);
    });
};
