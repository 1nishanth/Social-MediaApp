import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Feeds from "./../Pages/Feeds";


// Importing icons from @mui/icons-material
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from "@mui/icons-material/Add";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"; // For "My Photos"
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon

// Define navigation items
const navItems = [
    { name: "Home", link: "/", icon: <HomeIcon /> },
    { name: "My Profile", link: "/profile", icon: <AccountBoxIcon /> },
    { name: "My Photos", link: "/myphotos", icon: <PhotoLibraryIcon /> },
    { name: "Create Post", link: "/createpost", icon: <AddIcon /> },
];

const Layout = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <aside className="hidden lg:block bg-black text-white lg:w-1/6">
                <nav className="sticky top-0 p-6">
                    <h2 className="text-lg font-bold text-center mb-8">VIBESNAP</h2>
                    <ul className="space-y-4">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.link}
                                    className="flex items-center py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="ml-3">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => navigate('/logout')}
                                className="flex items-center py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                            >
                                <span className="text-lg">
                                    <LogoutIcon />
                                </span>
                                <span className="ml-3">Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100">
                <div className="p-4">
                    {/* <Outlet /> */}
                    <Feeds />
                </div>
            </div>
        </div>
    );
};

export default Layout;
