import axios from "axios";
import API_URL from "../constants/API";

const login = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, payload);
    return response;
  } catch (err) {
    if (err.response) {
      throw err.response;
    }
  }
};

const register = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, payload);
    return response;
  } catch (err) {
    if (err.response) {
      throw err.response;
    }
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("persist:root");
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
