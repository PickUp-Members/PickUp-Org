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

/* Admin */
// Get all pending requests
export const getAllPendingRequests = async () => {
    try {
        const response = await axios.get(`${url}/getAllPendingRequests`);
        return response.data;
    }
    catch (error) {
        console.error("getAllPendingRequests error:", error.response?.data || error.message);
        return {
        success: false,
        error: error.response?.data || "Server error",
        };
    }
}

// Approve Seller Request
export const approveSellerRequest = async (userId) => {
    try {
        const response = await axios.patch(
            `${url}/approveSellerRequest/${userId}`
        );

        return response.data;
    } 
    catch (error) {
        console.error(
            "approveSellerRequest error:",
            error.response?.data || error.message
        );

        return {
            success: false,
            error: error.response?.data || "Server error",
        };
    } 
    finally {
        console.log("approveSellerRequest process completed");
        // Example:
        // setLoading(false); (if using loading state)
    }
};
// Reject Seller Request
export const rejectSellerRequest = async (userId) => {
    try {
        const response = await axios.patch(`${url}/rejectSellerRequest/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error("rejectSellerRequest error:", error.response?.data || error.message);
        return {
        success: false,
        error: error.response?.data || "Server error",
        };
    }
}
