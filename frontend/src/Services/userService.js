import axios from "axios";

const url = "http://localhost:8080/api/user";

/* Buyer */
// Become-Seller
export const applySeller = async (userId, businessData) => {
    try {
        const response = await axios.patch(
            `${url}/${userId}/become-seller`,
            businessData
        );
        return response.data;
    }
    catch (error) {
        console.error("applySeller error:", error.response?.data || error.message);

        return {
        success: false,
        error: error.response?.data || "Server error",
        };
    }
}