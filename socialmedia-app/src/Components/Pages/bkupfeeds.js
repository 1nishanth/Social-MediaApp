// import React, { useState, useEffect } from "react";


// const Feeds = () => {
//     const [feeds, setFeeds] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [page, setPage] = useState(1); // Pagination for infinite scroll

//     // Fetch data from API
//     const fetchFeeds = () => {
//         <h2>Hey Its Main page</h2>
//     };




//     return (
//         <div className="bg-gray-100 min-h-screen">


//             {/* Floating Button */}
//             <button className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white flex items-center justify-center rounded-full shadow-lg text-3xl">
//                 +
//             </button>

//             {/* Loading Spinner */}
//             {loading && (
//                 <div className="text-center py-4">
//                     <p>Loading...</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Feeds;
import React, { useContext, useEffect, useRef, useState } from "react";
import { PostContext } from "../context/PostContext";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const Feeds = () => {
    const { posts, loading, loadMorePosts, likePost } = useContext(PostContext);
    const [isFetching, setIsFetching] = useState(false);
    const loaderRef = useRef();

    // Infinite scrolling handler
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && !isFetching) {
                    setIsFetching(true);
                    loadMorePosts().finally(() => setIsFetching(false));
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [loading, isFetching, loadMorePosts]);

    // const handleLike = (postId) => {
    //     likePost(postId);
    // };

    const handleLike = async (postId) => {
        try {
            await likePost(postId); // Update in Firestore
            toast.success("Post liked!");
        } catch (error) {
            toast.error("Failed to like the post.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">Social Media Feed</h1>

                {/* Post List */}
                {loading && posts.length === 0 ? (
                    <p className="text-center text-gray-500">Loading posts...</p>
                ) : (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white shadow-md rounded-lg p-4 mb-6"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <img
                                    src={post.userAvatar || "https://via.placeholder.com/50"}
                                    alt={post.userName || "User"}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-bold">{post.userName || "Anonymous"}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(post.timestamp?.seconds * 1000).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-800 mb-4">{post.text}</p>

                            {post.images && (
                                <div className="grid grid-cols-2 gap-2">
                                    {post.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Post Image ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            )}

                            {post.video && (
                                <video
                                    controls
                                    className="w-full mt-4 rounded-md"
                                >
                                    <source src={post.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}

                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={() => handleLike(post.id)}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                                >
                                    <FaHeart />
                                    <span>{post.likes || 0}</span>
                                </button>
                                <span className="text-sm text-gray-500">Likes</span>
                            </div>
                        </div>
                    ))
                )}

                {/* Infinite Scroll Loader */}
                <div ref={loaderRef} className="text-center py-4">
                    {isFetching && (
                        <>
                            <p className="text-gray-500">Loading more posts...</p>
                            {toast.info("Loading more posts...")}
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Feeds;
