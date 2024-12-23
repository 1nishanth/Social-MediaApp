// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Feeds = () => {

//     const navigate = useNavigate();

//     return (
//         <div className="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
//             {/* Header */}
//             <div className="w-full max-w-4xl">
//                 <div className="bg-white rounded-xl shadow p-5 mb-6">
//                     <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/profile')}>
//                         <img
//                             src="https://via.placeholder.com/40" // Replace with actual image URL
//                             alt="Profile"
//                             className="w-12 h-12 rounded-full object-cover"
//                         />
//                         <div>
//                             <p className="text-sm text-gray-300 text-left">Welcome Back,</p>
//                             <h1 className="text-lg font-semibold">Sakshi Agarwal</h1>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Feeds */}
//             <div className="w-full max-w-4xl space-y-6">
//                 {/* Post 1 */}
//                 <div className="bg-white rounded-lg shadow p-5">
//                     <div className="flex items-center gap-4 mb-3">
//                         <img
//                             src="https://via.placeholder.com/40" // Replace with actual image URL
//                             alt="User Avatar"
//                             className="w-10 h-10 rounded-full object-cover"
//                         />
//                         <div>
//                             <h2 className="font-medium text-left">Aarav</h2>
//                             <p className="text-sm text-gray-500 text-left">2 hours ago</p>
//                         </div>
//                     </div>
//                     <p className="mb-4 text-gray-700 text-left">
//                         Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽
//                         <span className="text-blue-500"> #NYC #Travel</span>
//                     </p>
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                         <img
//                             src="https://via.placeholder.com/150" // Replace with actual image URL
//                             alt="NYC 1"
//                             className="rounded-lg w-full h-auto object-cover"
//                         />
//                         <img
//                             src="https://via.placeholder.com/150" // Replace with actual image URL
//                             alt="NYC 2"
//                             className="rounded-lg w-full h-auto object-cover"
//                         />
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <button className="flex items-center gap-2 text-pink-500">
//                             ❤️ <span>67</span>
//                         </button>
//                         <button
//                             className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-all duration-200 text-sm sm:text-base px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm"
//                         >
//                             ➡️ <span>Share</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Post 2 */}
//                 <div className="bg-white rounded-lg shadow p-5">
//                     <div className="flex items-center gap-4 mb-3">
//                         <img
//                             src="https://via.placeholder.com/40" // Replace with actual image URL
//                             alt="User Avatar"
//                             className="w-10 h-10 rounded-full object-cover"
//                         />
//                         <div>
//                             <h2 className="font-medium text-left">Sneha</h2>
//                             <p className="text-sm text-gray-500 text-left">1 day ago</p>
//                         </div>
//                     </div>
//                     <p className="mb-4 text-gray-700 text-left">
//                         Taking a moment to slow down, breathe, and focus on myself. 🌿✨
//                         Self-care isn’t selfish — it’s necessary. 💕
//                         <span className="text-blue-500"> #SelfCare #MeTime #Wellness</span>
//                     </p>
//                     <div className="relative">
//                         <img
//                             src="https://via.placeholder.com/300" // Replace with actual image URL
//                             alt="Self Care"
//                             className="rounded-lg w-full h-auto object-cover"
//                         />
//                         <button className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-30 rounded-lg">
//                             ▶️
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Floating Button */}
//             <button
//                 className="fixed bottom-6 right-8 bg-black text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg md:hidden text-4xl"
//                 onClick={() => navigate('/createPost')}
//             >
//                 +
//             </button>

//         </div>
//     );
// };

// export default Feeds;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Feeds = () => {
    const navigate = useNavigate();
    const { fetchPosts } = useContext(PostContext); // Access fetchPosts from PostContext
    const [posts, setPosts] = useState([]); // State to store posts
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [userName, setUserName] = useState("User"); // State for dynamic user name

    // Fetch user's profile information
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userDocRef = doc(db, "users", "currentUserId"); // Replace "currentUserId" with the actual user's ID
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserName(userDoc.data().name || "User"); // Set user's name or fallback to "User"
                } else {
                    console.warn("User document does not exist.");
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        fetchUserName();
    }, []);

    // Fetch posts on component mount
    useEffect(() => {

        const loadPosts = async () => {
            try {
                const data = await fetchPosts(); // Fetch posts from Firebase
                setPosts(data); // Set fetched posts in state
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false); // Stop loading indicator
            }
        };

        loadPosts();
    }, [fetchPosts]);

    return (
        <div className="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
            {/* Header */}
            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-xl shadow p-5 mb-6">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/profile')}>
                        <img
                            src="https://via.placeholder.com/40" // Replace with actual image URL
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-sm text-gray-300 text-left">Welcome Back,</p>
                            <h1 className="text-lg font-semibold">{userName}</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feeds */}
            <div className="w-full max-w-4xl space-y-6">
                {loading ? ( // Display loading message while fetching posts
                    <p>Loading...</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow p-5">
                            <div className="flex items-center gap-4 mb-3">
                                <img
                                    src={post.userAvatar || "https://via.placeholder.com/40"} // Use post's user avatar or placeholder
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="font-medium text-left">{post.username || "Anonymous"}</h2>
                                    <p className="text-sm text-gray-500 text-left">{post.timestamp || "Unknown time"}</p>
                                </div>
                            </div>
                            <p className="mb-4 text-gray-700 text-left">{post.content || "No content"}</p>
                            {post.images && post.images.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {post.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Post Image ${index + 1}`}
                                            className="rounded-lg w-full h-auto object-cover"
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <button className="flex items-center gap-2 text-pink-500">
                                    ❤️ <span>{post.likes || 0}</span>
                                </button>
                                <button
                                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-all duration-200 text-sm sm:text-base px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm"
                                >
                                    ➡️ <span>Share</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Floating Button */}
            <button
                className="fixed bottom-6 right-8 bg-black text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg md:hidden text-4xl"
                onClick={() => navigate('/createPost')}
            >
                +
            </button>
        </div>
    );
};

export default Feeds;

