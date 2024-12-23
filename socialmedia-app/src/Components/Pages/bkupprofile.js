// import React, { useState, useEffect } from "react";
// import {
//     doc,
//     getDoc,
//     updateDoc,
//     collection,
//     query,
//     where,
//     getDocs,
// } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig"; // Import your Firebase config
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Profile({ userId }) {
//     const [userData, setUserData] = useState({});
//     const [posts, setPosts] = useState([]);
//     const [isEditing, setIsEditing] = useState(false);
//     const [newBio, setNewBio] = useState("");
//     const [newCoverPhoto, setNewCoverPhoto] = useState("");
//     const [newProfilePicture, setNewProfilePicture] = useState("");

//     // Fetch user profile data
//     useEffect(() => {
//         const fetchProfile = async () => {
//             const userDoc = await getDoc(doc(db, "users", userId));
//             if (userDoc.exists()) {
//                 setUserData(userDoc.data());
//                 setNewBio(userDoc.data().bio);
//                 setNewCoverPhoto(userDoc.data().coverPhoto);
//                 setNewProfilePicture(userDoc.data().profilePicture);
//             } else {
//                 toast.error("User not found.");
//             }
//         };

//         const fetchPosts = async () => {
//             const q = query(
//                 collection(db, "posts"),
//                 where("userId", "==", userId)
//             );
//             const postDocs = await getDocs(q);
//             const userPosts = postDocs.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setPosts(userPosts);
//         };

//         fetchProfile();
//         fetchPosts();
//     }, [userId]);

//     // Save profile edits
//     const saveProfile = async () => {
//         try {
//             await updateDoc(doc(db, "users", userId), {
//                 bio: newBio,
//                 coverPhoto: newCoverPhoto,
//                 profilePicture: newProfilePicture,
//             });
//             setUserData((prev) => ({
//                 ...prev,
//                 bio: newBio,
//                 coverPhoto: newCoverPhoto,
//                 profilePicture: newProfilePicture,
//             }));
//             setIsEditing(false);
//             toast.success("Profile updated successfully!");
//         } catch (error) {
//             toast.error("Error updating profile.");
//         }
//     };

//     return (
//         <div className="flex flex-col bg-gray-100 min-h-screen">
//             {/* Cover Photo */}
//             <div
//                 className="w-full h-48 bg-cover bg-center relative"
//                 style={{
//                     backgroundImage: `url(${userData.coverPhoto})`,
//                 }}
//             >
//                 {isEditing && (
//                     <input
//                         type="text"
//                         className="absolute top-2 left-2 bg-white p-2 rounded shadow"
//                         value={newCoverPhoto}
//                         onChange={(e) => setNewCoverPhoto(e.target.value)}
//                     />
//                 )}
//             </div>

//             {/* Profile Picture */}
//             <div className="-mt-12 flex justify-center">
//                 <div className="w-24 h-24 rounded-full border-4 border-white">
//                     <img
//                         src={userData.profilePicture}
//                         alt="Profile"
//                         className="w-full h-full rounded-full object-cover"
//                     />
//                     {isEditing && (
//                         <input
//                             type="text"
//                             className="mt-2 bg-white p-2 rounded shadow"
//                             value={newProfilePicture}
//                             onChange={(e) => setNewProfilePicture(e.target.value)}
//                         />
//                     )}
//                 </div>
//             </div>

//             {/* User Info */}
//             <div className="text-center mt-4">
//                 <h2 className="text-2xl font-bold">{userData.name}</h2>
//                 {isEditing ? (
//                     <textarea
//                         className="mt-2 p-2 w-64 border rounded"
//                         value={newBio}
//                         onChange={(e) => setNewBio(e.target.value)}
//                     />
//                 ) : (
//                     <p className="text-gray-600">{userData.bio}</p>
//                 )}
//             </div>

//             {/* Edit Profile Button */}
//             <div className="text-center">
//                 <button
//                     onClick={() => setIsEditing(!isEditing)}
//                     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                     {isEditing ? "Cancel" : "Edit Profile"}
//                 </button>
//                 {isEditing && (
//                     <button
//                         onClick={saveProfile}
//                         className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
//                     >
//                         Save Changes
//                     </button>
//                 )}
//             </div>

//             {/* My Posts */}
//             <h3 className="text-xl font-bold mt-8 text-center">My Posts</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 px-4">
//                 {posts.map((post) => (
//                     <div
//                         key={post.id}
//                         className="bg-white rounded shadow overflow-hidden"
//                     >
//                         <img
//                             src={post.imageUrl}
//                             alt={post.caption}
//                             className="w-full h-40 object-cover"
//                         />
//                         <div className="p-2">
//                             <p className="font-bold">{post.caption}</p>
//                             <p className="text-gray-600">{post.likes} likes</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Profile;

import React, { useState } from "react";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [coverImage, setCoverImage] = useState("https://via.placeholder.com/500x200");
    const [profileImage, setProfileImage] = useState("https://via.placeholder.com/120");
    const [username, setUsername] = useState("Sakshi Agarwal");
    const [bio, setBio] = useState("Just someone who loves designing, sketching, and finding beauty in the little things ✨");
    const navigate = useNavigate();


    const handleEditClick = () => {
        setIsEditing((prevState) => !prevState);
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
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden relative" style={{ minHeight: "800px" }}>
                {/* Header Section */}
                <div className="relative">
                    <img
                        src={coverImage}
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
                                src={profileImage}
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
                {isEditing && (
                    <div className="px-4 mb-8 fixed bottom-6 left-0 right-0 flex justify-center">
                        <button
                            onClick={handleEditClick}
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
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Post 1"
                                    className="w-full h-24 object-cover rounded-lg"
                                />
                                <div className="absolute bottom-2 left-2 text-white text-sm">
                                    <h3>Design meet</h3>
                                    <p className="text-xs">❤️ 67</p>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Post 2"
                                    className="w-full h-24 object-cover rounded-lg"
                                />
                                <div className="absolute bottom-2 left-2 text-white text-sm">
                                    <h3>Working on a B2B...</h3>
                                    <p className="text-xs">❤️ 40</p>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Post 3"
                                    className="w-full h-24 object-cover rounded-lg"
                                />
                                <div className="absolute bottom-2 left-2 text-white text-sm">
                                    <h3>Parachute ❤️</h3>
                                    <p className="text-xs">❤️ 65</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

