import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Importing icons from @mui/icons-material
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon

// Define navigation items
const navItems = [
    { name: "Home", link: "/feeds", icon: <HomeIcon /> },
    { name: "My Profile", link: "/profile", icon: <AccountBoxIcon /> },
    { name: "Create Post", link: "/createpost", icon: <AddIcon /> },
];

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div>
            <nav className="sticky top-0 p-3">
                <div className="flex items-center justify-center mb-5">
                    <img
                        src={require("../../assets/logo.png")} // Adjust the path if needed
                        alt="Logo"
                        className="w-10 h-10 mr-2" // Adjust size as needed
                    />
                    <h2 className="text-lg font-bold">VIBESNAP</h2>
                </div>
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
                            onClick={() => navigate('/login')}
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
        </div>
    );
};

export default Sidebar;
