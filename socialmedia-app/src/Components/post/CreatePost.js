// import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from '../layout/Sidebar'

// const CreatePost = () => {
//     const fileInputRef = useRef();
//     const [caption, setCaption] = useState("");
//     const [media, setMedia] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isMobile, setIsMobile] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 768); // Mobile and tablet detection
//         };

//         handleResize(); // Initial check
//         window.addEventListener("resize", handleResize);

//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         setMedia((prevMedia) => [...prevMedia, ...files]);
//     };

//     const handleNext = () => {
//         if (currentIndex < media.length - 1) {
//             setCurrentIndex(currentIndex + 1);
//         }
//     };

//     const handlePrev = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1);
//         }
//     };

//     const removeMedia = (index) => {
//         setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
//         if (index === currentIndex && currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1);
//         }
//     };

//     const handleVideoHover = (videoRef, action) => {
//         if (videoRef) {
//             if (action === "play") {
//                 videoRef.play();
//             } else if (action === "pause") {
//                 videoRef.pause();
//             }
//         }
//     };

//     return (
//         <div className="flex flex-col lg:flex-row min-h-screen">
//             {/* Sidebar: Hidden on mobile/tablet, visible only on desktop/laptop */}
//             <aside className="hidden lg:block bg-black text-white lg:w-1/6">
//                 <Sidebar />
//             </aside>

//             {/* Main Content */}
//             <div className="flex-1 flex justify-center items-center bg-gray-100 p-4">
//                 <div
//                     className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
//                     style={{ minHeight: "750px" }}
//                 >
//                     {/* Header */}
//                     <div>
//                         <div className="flex items-center mb-4">
//                             <button className="text-gray-600" onClick={() => navigate("/feeds")}>
//                                 <span className="material-icons">arrow_back</span>
//                             </button>
//                             <h2 className="text-lg font-semibold ml-2 text-center">New Post</h2>
//                         </div>

//                         {/* Media Carousel */}
//                         {media.length > 0 ? (
//                             <div className="relative mb-4">
//                                 <div className="w-full h-64 bg-gray-100 rounded-md overflow-hidden">
//                                     {media[currentIndex].type.startsWith("image/") ? (
//                                         <img
//                                             src={URL.createObjectURL(media[currentIndex])}
//                                             alt="preview"
//                                             className="w-full h-full object-cover"
//                                         />
//                                     ) : (
//                                         <video
//                                             src={URL.createObjectURL(media[currentIndex])}
//                                             className="w-full h-auto max-h-64 object-cover"
//                                             controls={false}
//                                             onMouseOver={(e) => handleVideoHover(e.target, "play")}
//                                             onMouseOut={(e) => handleVideoHover(e.target, "pause")}

//                                         ></video>
//                                     )}
//                                 </div>
//                                 {/* Carousel Navigation */}
//                                 {media.length > 1 && (
//                                     <>
//                                         <button
//                                             onClick={handlePrev}
//                                             disabled={currentIndex === 0}
//                                             className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 text-gray-700 focus:outline-none"
//                                         >
//                                             <span className="material-icons">chevron_left</span>
//                                         </button>
//                                         <button
//                                             onClick={handleNext}
//                                             disabled={currentIndex === media.length - 1}
//                                             className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-gray-700 focus:outline-none"
//                                         >
//                                             <span className="material-icons">chevron_right</span>
//                                         </button>
//                                     </>
//                                 )}

//                                 {/* Delete Button */}
//                                 <button
//                                     onClick={() => removeMedia(currentIndex)}
//                                     className="absolute bottom-6 right-2 p-1 text-white rounded-full focus:outline-none"
//                                 >
//                                     <span className="material-icons text-white">delete</span>
//                                 </button>

//                                 {/* Pagination Dots */}
//                                 {media.length > 1 && (
//                                     <div className="flex justify-center space-x-2 mt-2">
//                                         {media.map((_, index) => (
//                                             <button
//                                                 key={index}
//                                                 onClick={() => setCurrentIndex(index)}
//                                                 className={`w-2.5 h-2.5 rounded-full focus:outline-none ${currentIndex === index
//                                                     ? "bg-black"
//                                                     : "bg-gray-300"
//                                                     }`}
//                                             ></button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         ) : (
//                             <textarea
//                                 className="w-full h-40 border rounded-md p-2 mb-4 text-gray-600 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="What's on your mind?"
//                                 value={caption}
//                                 onChange={(e) => setCaption(e.target.value)}
//                                 style={{ minHeight: "250px" }}

//                             />
//                         )}

//                         {/* Upload Options */}
//                         <div className="flex flex-col space-y-3 mb-4">
//                             {media.length === 0 ? (
//                                 isMobile ? (
//                                     // Mobile and Tablet: Show Photo, Video, Camera options
//                                     <>
//                                         <button
//                                             onClick={() => fileInputRef.current.click()} // Trigger file input for Photo
//                                             className="flex items-center space-x-2 text-black focus:outline-none"
//                                         >
//                                             <span className="material-icons text-green-500">photo</span>
//                                             <span>Photos</span>
//                                         </button>
//                                         <button
//                                             onClick={() => fileInputRef.current.click()} // Same functionality for video
//                                             className="flex items-center space-x-2 text-black focus:outline-none"
//                                         >
//                                             <span className="material-icons text-purple-500">videocam</span>
//                                             <span>Videos</span>
//                                         </button>
//                                         <button
//                                             onClick={() => fileInputRef.current.click()} // Trigger file input for Camera
//                                             className="flex items-center space-x-2 text-black focus:outline-none"
//                                         >
//                                             <span className="material-icons text-blue-500">camera_alt</span>
//                                             <span>Camera</span>
//                                         </button>
//                                     </>
//                                 ) : (
//                                     // Desktop: Show Choose File
//                                     <>
//                                         <button
//                                             onClick={() => fileInputRef.current.click()}
//                                             className="flex items-center space-x-2 text-black-600 focus:outline-none"
//                                         >
//                                             <span className="material-icons text-red-500">folder</span>
//                                             <span>Choose File</span>
//                                         </button>
//                                         <button
//                                             onClick={() => fileInputRef.current.click()}
//                                             className="flex items-center space-x-2 text-black-600 focus:outline-none"
//                                         >
//                                             <span className="material-icons text-blue-500">camera_alt</span>
//                                             <span>Camera</span>
//                                         </button>
//                                     </>
//                                 )
//                             ) : media.every((file) => file.type.startsWith("image/")) ? (
//                                 // Only images selected: Show "Add More Photos"
//                                 <button
//                                     onClick={() => fileInputRef.current.click()}
//                                     className="flex items-center space-x-2 text-black focus:outline-none"
//                                 >
//                                     <span className="material-icons text-green-500">image</span>
//                                     <span>Add More Photos</span>
//                                 </button>
//                             ) : media.every((file) => file.type.startsWith("video/")) ? (
//                                 // Only videos selected: Show "Add More Videos"
//                                 <button
//                                     onClick={() => fileInputRef.current.click()}
//                                     className="flex items-center space-x-2 text-black focus:outline-none"
//                                 >
//                                     <span className="material-icons text-purple-500">videocam</span>
//                                     <span>Add More Videos</span>
//                                 </button>
//                             ) : null}
//                             <input
//                                 ref={fileInputRef}
//                                 type="file"
//                                 accept="image/*,video/*"
//                                 multiple
//                                 className="hidden"
//                                 onChange={handleFileChange}
//                             />
//                         </div>

//                         {/* Caption Input */}
//                         {media.length > 0 && (
//                             <div className="w-full rounded-md bg-gray-200 p-3 text-gray-600 mt-4">
//                                 <textarea
//                                     className="w-full h-28 bg-transparent border-none resize-none focus:outline-none"
//                                     placeholder="Write a caption..."
//                                     value={caption}
//                                     onChange={(e) => setCaption(e.target.value)}
//                                 ></textarea>
//                             </div>
//                         )}
//                     </div>

//                     {/* Create Button */}
//                     <div className="mt-auto">
//                         <button
//                             className="w-full bg-black text-white rounded-full py-2 text-center hover:bg-gray-800"
//                             onClick={() => alert("Post created!")}
//                         >
//                             CREATE
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default CreatePost;


import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

const CreatePost = () => {
    const fileInputRef = useRef();
    const [caption, setCaption] = useState("");
    const [media, setMedia] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Mobile and tablet detection
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setMedia((prevMedia) => [...prevMedia, ...files]);
    };

    const handleNext = () => {
        if (currentIndex < media.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const removeMedia = (index) => {
        setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
        if (index === currentIndex && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleVideoHover = (videoRef, action) => {
        if (videoRef) {
            if (action === "play") {
                videoRef.play();
            } else if (action === "pause") {
                videoRef.pause();
            }
        }
    };

    const handleCreatePost = () => {
        // Simulate post creation API response
        setTimeout(() => {
            alert("Post created successfully!");
        }, 1000);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <aside className="hidden lg:block bg-black text-white lg:w-1/6">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex justify-center items-center bg-gray-100 p-4">
                <div
                    className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                    style={{ minHeight: "750px" }}
                >
                    {/* Header */}
                    <div>
                        <div className="flex items-center mb-4">
                            <button className="text-gray-600" onClick={() => navigate("/feeds")}>
                                <span className="material-icons">arrow_back</span>
                            </button>
                            <h2 className="text-lg font-semibold ml-2 text-center">New Post</h2>
                        </div>

                        {/* Media Carousel */}
                        {media.length > 0 ? (
                            <div className="relative mb-4">
                                <div className="w-full h-64 bg-gray-100 rounded-md overflow-hidden">
                                    {media[currentIndex].type.startsWith("image/") ? (
                                        <img
                                            src={URL.createObjectURL(media[currentIndex])}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <video
                                            src={URL.createObjectURL(media[currentIndex])}
                                            className="w-full h-auto max-h-64 object-cover"
                                            controls={false}
                                            onMouseOver={(e) => handleVideoHover(e.target, "play")}
                                            onMouseOut={(e) => handleVideoHover(e.target, "pause")}
                                        ></video>
                                    )}
                                </div>

                                {/* Pagination Dots */}
                                {media.length > 1 && (
                                    <div className="flex justify-center space-x-2 mt-2">
                                        {media.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex(index)}
                                                className={`w-2.5 h-2.5 rounded-full focus:outline-none ${currentIndex === index
                                                    ? "bg-black"
                                                    : "bg-gray-300"
                                                    }`}
                                            ></button>
                                        ))}
                                    </div>
                                )}

                                {/* Carousel Navigation */}
                                {media.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrev}
                                            disabled={currentIndex === 0}
                                            className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 text-gray-700 focus:outline-none"
                                        >
                                            <span className="material-icons">chevron_left</span>
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={currentIndex === media.length - 1}
                                            className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-gray-700 focus:outline-none"
                                        >
                                            <span className="material-icons">chevron_right</span>
                                        </button>
                                    </>
                                )}

                                {/* Delete Button */}
                                <button
                                    onClick={() => removeMedia(currentIndex)}
                                    className="absolute bottom-6 right-2 p-1 text-white rounded-full focus:outline-none"
                                >
                                    <span className="material-icons text-white">delete</span>
                                </button>
                            </div>
                        ) : (
                            <textarea
                                className="w-full h-40 border rounded-md p-2 mb-4 text-gray-600 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="What's on your mind?"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                style={{ minHeight: "250px" }}
                            />
                        )}

                        {/* Upload Options */}
                        <div className="flex flex-col space-y-3 mb-4">
                            {media.length === 0 ? (
                                isMobile ? (
                                    <>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center space-x-2 text-black focus:outline-none"
                                        >
                                            <span className="material-icons text-green-500">photo</span>
                                            <span>Photos</span>
                                        </button>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center space-x-2 text-black focus:outline-none"
                                        >
                                            <span className="material-icons text-purple-500">videocam</span>
                                            <span>Videos</span>
                                        </button>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center space-x-2 text-black focus:outline-none"
                                        >
                                            <span className="material-icons text-blue-500">camera_alt</span>
                                            <span>Camera</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center space-x-2 text-black focus:outline-none"
                                        >
                                            <span className="material-icons text-red-500">folder</span>
                                            <span>Choose File</span>
                                        </button>

                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center space-x-2 text-black focus:outline-none"
                                        >
                                            <span className="material-icons text-blue-500">camera_alt</span>
                                            <span>Camera</span>
                                        </button>
                                    </>
                                )
                            ) : (
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="flex items-center space-x-2 text-black focus:outline-none"
                                >
                                    <span className="material-icons text-green-500">image</span>
                                    <span>{media.every((file) => file.type.startsWith("image/")) ? "Add More Photos" : "Add More Videos"}</span>
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Caption Input */}
                        {media.length > 0 && (
                            <div className="w-full rounded-md bg-gray-200 p-3 text-gray-600 mt-4">
                                <textarea
                                    className="w-full h-28 bg-transparent border-none resize-none focus:outline-none"
                                    placeholder="Write a caption..."
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                ></textarea>
                            </div>
                        )}
                    </div>

                    {/* Create Button */}
                    <div className="mt-auto">
                        <button
                            className="w-full bg-black text-white rounded-full py-2 text-center hover:bg-gray-800"
                            onClick={handleCreatePost}
                        >
                            CREATE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
