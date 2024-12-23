import React from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import { useMedia } from "../context/PostContextContext";

const FileUploader = () => {
    const { addMedia } = useMedia();

    const handleFileUpload = (fileInfo) => {
        if (fileInfo && fileInfo.cdnUrl) {
            const file = {
                url: fileInfo.cdnUrl, // Use Uploadcare CDN URL
                name: fileInfo.name,
                size: fileInfo.size,
                type: fileInfo.mimeType,
                path: fileInfo.uuid, // Unique identifier from Uploadcare
            };
            addMedia(file); // Add the file to your media context
        } else {
            console.error("Invalid file upload information.");
        }
    };

    return (
        <div>
            <FileUploaderRegular
                sourceList="local, url, camera, dropbox"
                classNameUploader="uc-light"
                pubkey="434d088f37f2be0a0e54"
                data-input-accept-types="image/*,video/*"
                onChange={handleFileUpload} // Handle the uploaded file
            />
        </div>
    );
};

export default FileUploader;
