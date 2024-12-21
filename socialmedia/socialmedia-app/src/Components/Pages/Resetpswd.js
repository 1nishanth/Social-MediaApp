import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const { resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setEmailError("");
        setSuccessMessage("");

        if (!email) {
            setEmailError("Email is required.");
            return;
        }

        try {
            await resetPassword(email);
            setSuccessMessage(
                "A password reset email has been sent. Please check your inbox."
            );
            setEmail("");
            setTimeout(() => navigate("/login"), 5000); // Redirect after 5 seconds
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setEmailError("No user found with this email.");
            } else {
                console.error("Reset password error:", error.message);
                setEmailError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 sm:p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 text-left">Email</label>
                        <input
                            type="email"
                            className={`w-full p-2 border rounded ${emailError ? "border-red-500" : "border-gray-300"
                                }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Send Reset Link
                    </button>
                </form>
                {successMessage && (
                    <p className="text-green-500 text-sm mt-4 text-center">
                        {successMessage}
                    </p>
                )}
                <p className="mt-4 text-sm text-center">
                    Remember your password?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default ResetPassword;

