import React, { useRef, useState, useEffect } from "react";
import { useMedia } from "../context/MediaContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const { media, addMedia, removeMedia } = useMedia();
    const fileInputRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Check initial screen size
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => addMedia(file));
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

    const handleVideoHover = (videoRef, action) => {
        if (videoRef) {
            if (action === "play") {
                videoRef.play();
            } else {
                videoRef.pause();
                videoRef.currentTime = 0;
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div
                className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                style={{ minHeight: "750px" }}
            >
                {/* Header */}
                <div>
                    <div className="flex items-center mb-4">
                        <button className="text-gray-600">
                            <span className="material-icons" onClick={() => navigate('/feeds')}>arrow_back</span>
                        </button>
                        <h2 className="text-lg font-semibold ml-2 text-center">New Post</h2>
                    </div>

                    {/* Media Preview or Input Area */}
                    {media.length > 1 ? (
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
                                        onMouseEnter={(e) => handleVideoHover(e.target, "play")}
                                        onMouseLeave={(e) => handleVideoHover(e.target, "pause")}
                                    ></video>
                                )}
                            </div>
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

                            <button
                                onClick={() => removeMedia(currentIndex)}
                                className="absolute bottom-2 right-2 p-1 text-white focus:outline-none"
                            >
                                <span className="material-icons text-sm">delete</span>
                            </button>

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
                        </div>
                    ) : media.length === 1 ? (
                        <div className="relative mb-4">
                            <div className="w-full h-64 bg-gray-100 rounded-md overflow-hidden">
                                {media[0].type.startsWith("image/") ? (
                                    <img
                                        src={URL.createObjectURL(media[0])}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <video
                                        src={URL.createObjectURL(media[0])}
                                        className="w-full h-auto max-h-64 object-cover"
                                        onMouseEnter={(e) => handleVideoHover(e.target, "play")}
                                        onMouseLeave={(e) => handleVideoHover(e.target, "pause")}
                                    ></video>
                                )}
                                <button
                                    onClick={() => removeMedia(0)}
                                    className="absolute bottom-2 right-2 p-1 text-white focus:outline-none"
                                >
                                    <span className="material-icons text-sm">delete</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <textarea
                            className="w-full h-40 border rounded-md p-2 mb-4 text-gray-600 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="What's on your mind?"
                            style={{ minHeight: "280px" }}
                        />
                    )}

                    {/* Upload Options */}
                    <div className="flex flex-col space-y-3 mb-4">
                        {media.length > 0 ? (
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="flex items-center space-x-2 text-gray-600 focus:outline-none"
                            >
                                <img
                                    src={media[0].type.startsWith("image/") ? "/path-to-photo-icon.png" : "/path-to-video-icon.jpg"}
                                    alt="icon"
                                    className="w-5 h-5"
                                />
                                <span>
                                    {media[0].type.startsWith("image/") ? "Add More Photos" : "Add More Videos"}
                                </span>
                            </button>
                        ) : (
                            <>
                                {isMobile ? (
                                    <>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center space-x-2 text-black-600 focus:outline-none"
                                        >
                                            <img src="../../assets/gallery-wide-svgrepo-com 1.png" alt="photos" className="w-5 h-5" />
                                            <span>Photos</span>
                                        </button>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center space-x-2 text-black-600 focus:outline-none"
                                        >
                                            <img src="../../assets/video-library-svgrepo-com 1.jpg" alt="videos" className="w-5 h-5" />
                                            <span>Videos</span>
                                        </button>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center space-x-2 text-black-600 focus:outline-none"
                                        >
                                            <span className="material-icons text-blue-500">camera_alt</span>
                                            <span>Camera</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center space-x-2 text-black-600 focus:outline-none"
                                        >
                                            <span className="material-icons text-red-500">folder</span>
                                            <span>Choose File</span>
                                        </button>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex items-center space-x-2 text-black-600 focus:outline-none"
                                        >
                                            <span className="material-icons text-blue-500">camera_alt</span>
                                            <span>Camera</span>
                                        </button>
                                    </>
                                )}
                            </>
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

                    {/* Caption Area */}
                    {media.length > 0 && (
                        <div className="w-full rounded-md bg-gray-200 p-3 text-gray-600 mt-4">
                            <textarea
                                className="w-full h-28 bg-transparent border-none resize-none focus:outline-none"
                                placeholder="Write a caption..."
                            ></textarea>
                        </div>
                    )}
                </div>

                {/* Create Button */}
                <div className="mt-auto">
                    <button className="w-full bg-black text-white rounded-full py-2 text-center hover:bg-gray-800">
                        CREATE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
