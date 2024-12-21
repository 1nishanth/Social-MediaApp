import React, { useRef } from "react";
import { useMedia } from "../context/MediaContext";

const CreatePost = () => {
    const { media, addMedia, removeMedia } = useMedia();
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => addMedia(file));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4">
                {/* Header */}
                <div className="flex items-center mb-4">
                    <button className="text-gray-600">
                        <span className="material-icons">arrow_back</span>
                    </button>
                    <h2 className="text-lg font-semibold ml-2">New Post</h2>
                </div>

                {/* Input Area */}
                <div className="relative">
                    <textarea
                        className="w-full h-32 border rounded-md p-2 mb-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="What's on your mind?"
                    />
                    {media.length > 0 && (
                        <div className="absolute top-2 right-2 flex items-center space-x-2">
                            {media.slice(0, 2).map((file, index) => (
                                <div
                                    key={index}
                                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-white"
                                    style={{
                                        backgroundColor: index === 0 ? "#8E44AD" : "#E74C3C",
                                    }}
                                >
                                    {file.name.charAt(0).toUpperCase()}
                                </div>
                            ))}
                            {media.length > 2 && (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-white">
                                    +{media.length - 2}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Upload Options */}
                <div className="flex flex-col space-y-3 mb-4">
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="flex items-center space-x-2 text-red-500"
                    >
                        <span className="material-icons">folder</span>
                        <span>Choose the file</span>
                    </button>
                    <button className="flex items-center space-x-2 text-blue-500">
                        <span className="material-icons">camera_alt</span>
                        <span>Camera</span>
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Media Preview */}
                {media.length > 0 && (
                    <div className="flex flex-col space-y-4 mb-4">
                        {media.map((file, index) => (
                            <div key={index} className="relative">
                                {file.type.startsWith("image/") ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                ) : (
                                    <video
                                        controls
                                        src={URL.createObjectURL(file)}
                                        className="w-full h-32 rounded-md"
                                    ></video>
                                )}
                                <button
                                    onClick={() => removeMedia(index)}
                                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                                >
                                    <span className="material-icons">delete</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create Button */}
                <button className="w-full bg-black text-white rounded-full py-2 text-center hover:bg-gray-800">
                    CREATE
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
