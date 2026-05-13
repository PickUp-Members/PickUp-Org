import axios from "axios";

const url = "http://localhost:8080/api/product";

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${url}/getAllProducts`);
        return response.data;
    }
    catch (error) {
        console.error("getAllProducts error:", error.response?.data || error.message);
        return {
        success: false,
        error: error.response?.data || "Server error",
        };
    }
}