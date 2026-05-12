import { useState } from "react";
import { loginUser } from "../Services/authService";

export const useAuth = () => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {

        try {

            setLoading(true);

            const data = await loginUser(email, password);

            console.log("Backend Response:", data);

            setUser(data);

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            return {
                success: true,
                user: data
            };

        } catch (error) {

            console.log(error);

            return {
                success: false,
                error:
                    error.response?.data ||
                    "Login failed"
            };

        } finally {

            setLoading(false);
        }
    };

    return {
        login,
        loading,
        user
    };
};