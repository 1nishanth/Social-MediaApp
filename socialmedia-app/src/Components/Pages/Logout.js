import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../context/AuthContext";

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Logout success");
            toast.success("Logged out successfully!");
            navigate("/login");
        } catch (error) {
            toast.error("Error during logout.");
            console.error("Error during logout:", error);
        }
    };

    return (
        <div onClick={handleLogout}>Logout</div>
    );
};

export default Logout;
