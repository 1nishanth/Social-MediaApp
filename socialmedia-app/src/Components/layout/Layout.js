import React from "react";
import Feeds from "../Pages/Feeds";
import Sidebar from "./Sidebar";

// Importing icons from @mui/icons-material


const Layout = () => {


    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <aside className="hidden lg:block bg-black text-white lg:w-1/6">

                <Sidebar />

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
