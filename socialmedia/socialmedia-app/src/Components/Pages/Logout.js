import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await logout();
            console.log("Logged out successfully!");
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
    );
};

export default Logout;
