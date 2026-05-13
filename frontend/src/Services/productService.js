import axios from "axios";
import { mockProducts } from "../Utils/mockData";

const url = "http://localhost:8080/api/product";

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${url}/getAllProducts`);
        return response.data;
    }
    catch (error) {
        console.error("getAllProducts error:", error.response?.data || error.message);
        console.log("Using mock data as fallback");
        // Return mock data as fallback when backend is not available
        return mockProducts;
    }
}