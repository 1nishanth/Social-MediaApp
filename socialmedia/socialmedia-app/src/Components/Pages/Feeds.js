import React, { useState, useEffect } from "react";
import axios from "axios";

const Feeds = () => {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Pagination for infinite scroll

    // Fetch data from API
    const fetchFeeds = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://api.example.com/feeds?page=${page}`
            );
            const newFeeds = response.data; // Assuming the API returns an array of feeds
            setFeeds((prev) => [...prev, ...newFeeds]);
            setPage(page + 1);
        } catch (error) {
            console.error("Error fetching feeds:", error);
        } finally {
            setLoading(false);
        }
    };

    // Infinite scroll effect
    useEffect(() => {
        fetchFeeds();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 20
        ) {
            fetchFeeds();
        }
    };

    const handleShare = (feed) => {
        if (navigator.share) {
            navigator
                .share({
                    title: `${feed.user}'s Post`,
                    text: feed.text,
                    url: window.location.href,
                })
                .catch((err) => console.error("Error sharing:", err));
        } else {
            alert("Sharing is not supported on this browser.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="bg-white p-4 shadow-md flex items-center space-x-3">
                <img
                    src="https://via.placeholder.com/50"
                    alt="User Profile"
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="text-gray-500 text-sm">Welcome Back,</p>
                    <h1 className="font-bold text-lg">Sakshi Agarwal</h1>
                </div>
            </div>

            {/* Feeds */}
            <div className="mt-6 space-y-6 p-4">
                {feeds.map((feed) => (
                    <div
                        key={feed.id}
                        className="bg-white rounded-3xl p-4 shadow-md"
                    >
                        <div className="flex items-center space-x-3">
                            <img
                                src={feed.profileImg}
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h2 className="font-bold">{feed.user}</h2>
                                <p className="text-gray-400 text-sm">{feed.activeTime}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <p className="mt-4 text-gray-700">{feed.text}</p>
                        <p className="text-blue-500 mt-2">{feed.tags}</p>

                        {/* Images */}
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {feed.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Post"
                                    className="w-full h-[200px] object-cover rounded-lg"
                                />
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                                <button
                                    className="text-red-500"
                                    onClick={() => alert("Liked!")}
                                >
                                    ❤️
                                </button>
                                <span className="text-gray-700">{feed.likes}</span>
                            </div>
                            <button
                                onClick={() => handleShare(feed)}
                                className="text-gray-500 bg-gray-200 px-3 py-1 rounded-lg"
                            >
                                Share
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Button */}
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white flex items-center justify-center rounded-full shadow-lg text-3xl">
                +
            </button>

            {/* Loading Spinner */}
            {loading && (
                <div className="text-center py-4">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default Feeds;
