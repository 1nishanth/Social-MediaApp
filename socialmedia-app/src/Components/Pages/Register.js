import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required.";
        if (!formData.lastName) newErrors.lastName = "Last name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await register(
                    formData.email,
                    formData.password,
                    formData.firstName,
                    formData.lastName
                );
                navigate("/feeds");
            } catch (error) {
                console.error("Register error:", error.message);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 sm:p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 text-left">
                            First Name
                        </label>
                        <input
                            type="text"
                            className={`w-full p-2 border rounded ${errors.firstName ? "border-red-500" : "border-gray-300"
                                }`}
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({ ...formData, firstName: e.target.value })
                            }
                            placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 text-left">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className={`w-full p-2 border rounded ${errors.lastName ? "border-red-500" : "border-gray-300"
                                }`}
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({ ...formData, lastName: e.target.value })
                            }
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 text-left">Email</label>
                        <input
                            type="email"
                            className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 text-left">
                            Password
                        </label>
                        <input
                            type="password"
                            className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
