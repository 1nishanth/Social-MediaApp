import React, { createContext, useState, useContext } from "react";

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
    const [media, setMedia] = useState([]);

    const addMedia = (file) => setMedia([...media, file]);

    const removeMedia = (index) => {
        setMedia(media.filter((_, i) => i !== index));
    };

    return (
        <MediaContext.Provider value={{ media, addMedia, removeMedia }}>
            {children}
        </MediaContext.Provider>
    );
};

export const useMedia = () => useContext(MediaContext);

export default MediaProvider;