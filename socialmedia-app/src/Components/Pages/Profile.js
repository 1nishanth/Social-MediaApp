import React, { useState, useEffect, useContext } from "react";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostContext } from "../context/PostContext";
import Sidebar from "../layout/Sidebar";

const ProfilePage = ({ }) => {
    const userId = 'QeVmJxFavZO4QeRTatuuh3c7ivB3';
    const [isEditing, setIsEditing] = useState(false);
    const [coverImage, setCoverImage] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [postsByUser, setPostsByUser] = useState([]);
    const navigate = useNavigate();

    const { getPostsByUser } = useContext(PostContext);

    // Fetch user data and posts
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                console.error("User ID is undefined.");
                toast.error("Failed to fetch user data. Please try again.");
                return;
            }
            let isMounted = true;

            const fetchUserData = async () => {
                if (!isMounted) return;

                try {
                    const userDoc = await getDoc(doc(db, "users", userId));
                    if (userDoc.exists() && isMounted) {
                        const userData = userDoc.data();
                        setCoverImage(userData.coverPhoto || null);
                        setProfileImage(userData.profilePicture || null);
                        setUsername(userData.name || "User Name");
                        setBio(userData.bio || "Bio not set.");
                    }

                    const userPosts = await getPostsByUser(userId);
                    if (isMounted) setPostsByUser(userPosts);
                } catch (error) {
                    if (isMounted) toast.error("Failed to fetch user data or posts.");
                }
            };
            fetchUserData();
            return () => {
                isMounted = false;
            };
        };
    }, [userId, getPostsByUser]);

    const handleEditClick = () => {
        setIsEditing((prevState) => !prevState);
    };

    const saveProfile = async () => {
        try {
            if (!username.trim()) throw new Error("Username cannot be empty.");
            if (!bio.trim()) throw new Error("Bio cannot be empty.");
            if (!coverImage || !profileImage) throw new Error("Both images are required.");

            const docRef = doc(db, "users", userId);
            await updateDoc(docRef, {
                coverPhoto: coverImage,
                profilePicture: profileImage,
                name: username,
                bio: bio,
            });

            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error.message || error);
            toast.error(`Failed to update profile: ${error.message || "An error occurred."}`);
        }
    };

    const handleImageChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            if (type === "cover") setCoverImage(imageUrl);
            else if (type === "profile") setProfileImage(imageUrl);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <aside className="hidden lg:block bg-black text-white lg:w-1/6">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-grow min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden relative" style={{ minHeight: "800px" }}>
                    {/* Header Section */}
                    <div className="relative">
                        <img
                            src={coverImage || null}
                            alt="Cover Background"
                            className="w-full h-40 object-cover"
                        />

                        {/* Back Button */}
                        <button className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md">
                            <FaArrowLeft className="text-gray-700" onClick={() => navigate("/feeds")} />
                        </button>

                        {/* Pencil Icon for Cover Image */}
                        {isEditing && (
                            <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                                <FaPencilAlt className="text-gray-700" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e, "cover")}
                                />
                            </label>
                        )}

                        {/* Profile Image */}
                        <div className="absolute -bottom-16 left-4">
                            <div className="relative">
                                <img
                                    src={profileImage || null}
                                    alt="Profile Avatar"
                                    className="w-28 h-28 border-4 border-white rounded-full"

                                />
                                {/* Pencil Icon for Profile Image */}
                                {isEditing && (
                                    <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
                                        <FaPencilAlt className="text-gray-700" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleImageChange(e, "profile")}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Edit Button */}
                    {!isEditing && (
                        <button
                            onClick={handleEditClick}
                            className="absolute mt-4 top-18 right-6 bg-gray-200 text-sm px-10 py-3 rounded-lg hover:bg-gray-300 shadow-md"
                        >
                            Edit Profile
                        </button>
                    )}

                    {/* Profile Info */}
                    <div className="px-4 mt-20">
                        <div className="flex flex-col">
                            {isEditing && <h3 className="text-sm font-bold mb-1 text-left">Name</h3>}
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-1 w-full text-lg font-bold text-gray-600 border-b border-gray-300 p-1"
                                />
                            ) : (
                                <p className="mt-1 text-lg font-bold text-left">{username}</p>
                            )}

                            {isEditing && <h3 className="text-sm font-bold mt-4 mb-1 text-left">Bio</h3>}
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="mt-1 w-full text-sm text-gray-600 border-b border-gray-300 p-1"
                                />
                            ) : (
                                <p className="mt-4 text-sm text-gray-600 text-left">{bio}</p>
                            )}
                        </div>
                    </div>

                    {/* Save Changes Button */}
                    {/* {isEditing && (
                        <div className="px-4 mb-8 fixed bottom-6 left-0 right-0 flex justify-center">
                            <button
                                onClick={saveProfile}
                                className="w-3/4 bg-black text-white rounded-full text-center hover:bg-gray-800 shadow-lg 
                       py-2 sm:py-3 mb-8"
                                style={{ maxWidth: "400px" }}
                            >
                                SAVE
                            </button>
                        </div>
                    )} */}

                    {/* Save Changes Button */}
                    {isEditing && (
                        <div className="px-4 mb-8 fixed bottom-6 left-0 right-0 flex justify-center">
                            <button
                                onClick={saveProfile}
                                className="w-3/4 bg-black text-white rounded-full text-center hover:bg-gray-800 shadow-lg 
                       py-2 sm:py-3 mb-8" // Adjust height for mobile and tablet
                                style={{ maxWidth: "400px" }}
                            >
                                SAVE
                            </button>
                        </div>
                    )}


                    {/* Posts */}
                    {!isEditing && (
                        <div className="px-4 mt-6">
                            <h2 className="text-lg font-bold mb-4 text-left">My Posts</h2>
                            {postsByUser && postsByUser.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {postsByUser.map((post) => (
                                        <div key={post.id} className="relative">
                                            <img
                                                src={post.imageUrl || "https://via.placeholder.com/150"}
                                                alt={post.caption || "Untitled Post"}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <div className="absolute bottom-2 left-2 text-white text-sm">
                                                <h3>{post.caption || "Untitled Post"}</h3>
                                                <p className="text-xs">❤️ {post.likes || 0}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 text-center mt-4">No posts available</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default ProfilePage;
