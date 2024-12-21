import React, { useContext } from "react";

// Import Feeds Component
import Feeds from "./../Pages/Feeds";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {

    const logout = useContext(AuthContext);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="hidden lg:block w-1/6 bg-black text-white">
                <nav className="sticky top-0 p-6">
                    <h2 className="text-lg font-bold text-center mb-8">VIBESNAP</h2>
                    <ul className="space-y-4">
                        <li>
                            <a href="#home" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
                                <span className="material-icons text-lg">home</span>
                                <span className="ml-3">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#myprofile" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
                                <span className="material-icons text-lg">person</span>
                                <span className="ml-3">My Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="#mypics" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
                                <span className="material-icons text-lg">photo</span>
                                <span className="ml-3">My Pics</span>
                            </a>
                        </li>
                        <li>
                            <a href="#createpost" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
                                <span className="material-icons text-lg">create</span>
                                <span className="ml-3">Create Post</span>
                            </a>
                        </li>
                        <li>
                            <a href="#logout" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
                                <span className="material-icons text-lg" onClick={logout}>logout</span>
                                <span className="ml-3">Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100">
                <div className="p-4">
                    <Feeds />
                </div>
            </div>
        </div>
    );
};

export default Layout;
