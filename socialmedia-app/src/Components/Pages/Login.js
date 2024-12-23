import React, { useState, useContext, useEffect } from "react";
import { auth, onAuthStateChanged } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import loginImage from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Login() {

    const { login, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);


    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            toast.success("Successfully signed in!");
            console.log("Succesfully Login")
            navigate("/feeds");
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.log("Failed!")
            console.error("Google login error:", error.message);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setEmailError("");
        setPasswordError("");

        let isValid = true;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            isValid = false;
        }

        // Validate password length
        if (!password) {
            setPasswordError("Password is required.");
            isValid = false;
        } else if (password.length < 4) {
            setPasswordError("Password must be at least 4 characters.");
            isValid = false;
        }

        if (!isValid) return;

        try {
            // Sign in with email and password
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("User successfully signed in:", result.user);
            toast.success("Successfully signed in!");
            navigate("/feeds");
        } catch (error) {
            console.error("Error during email/password login:", error.message);

            if (error.code === "auth/user-not-found") {
                setEmailError("No user found with this email.");
                toast.error("No user found with this email.");
            } else if (error.code === "auth/wrong-password") {
                setPasswordError("Incorrect password.");
                toast.error("Incorrect password.");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };


    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            {/* Background Image Section */}
            <div
                className="grid grid-cols-3 gap-2 w-full h-1/2 bg-cover"
                style={{
                    backgroundImage: `url(${loginImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "50vh",
                }}
            ></div>

            {/* Login Section */}
            <div className="w-full max-w-lg bg-white shadow-lg rounded-t-3xl px-6 py-8 -mt-12">
                <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
                <form className="mt-6" onSubmit={handleFormSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 text-left"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your email"
                        />
                        {emailError && (
                            <p className="text-red-500 text-xs mt-1">{emailError}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 text-left"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your password"
                        />
                        {passwordError && (
                            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
                    >
                        Login
                    </button>
                </form>

                {/* Reset Password */}
                <div className="text-right mt-6">
                    <a
                        href="/reset-password"
                        onClick={() => navigate('/reset-password')}
                        className="text-sm text-blue-500 hover:underline font-medium"
                    >
                        Forgot password?
                    </a>
                </div>

                {/* Heading and Subtitle */}
                <div className="text-center mt-6">
                    <div className="flex items-center justify-center">
                        <img
                            src={require("../../assets/logo.png")} // Adjust the path if needed
                            alt="Logo"
                            className="w-10 h-10 mr-2" // Adjust size and margin as needed
                        />
                        <h2 className="text-lg font-semibold text-gray-800">Vibesnap</h2>
                    </div>
                    <p className="text-sm text-gray-500">Moments That Matter, Shared Forever.</p>
                </div>

                {/* Google Sign-In */}
                <div className="mt-6">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google Logo"
                            className="w-5 h-5 mr-3"
                        />
                        Continue with Google
                    </button>
                </div>

                {/* Register Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{" "}
                        <a
                            href="/register"
                            onClick={() => navigate('/register')}
                            className="text-blue-500 hover:underline font-medium"
                        >
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
