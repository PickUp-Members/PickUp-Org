import axios from "axios";

const url = "http://localhost:8080/api/auth"

// Register
export const registerUser = async (userData) => {
    const response = await axios.post(`${url}/register`, userData);
    return response.data;
}

// Login
export const loginUser = async (email, password) => {
    const response = await axios.post(`${url}/login`, { email, password });
    return response.data;
}