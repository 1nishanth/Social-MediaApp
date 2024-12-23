import React, { createContext, useState, useEffect } from "react";
import {
    collection,
    query,
    orderBy,
    limit,
    startAfter,
    addDoc,
    onSnapshot,
    serverTimestamp,
    doc,
    getDoc,
    updateDoc,
    increment,
    where,
    setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

// Create the PostContext
export const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastVisible, setLastVisible] = useState(null);

    // Fetch initial posts
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         setLoading(true);
    //         try {
    //             const q = query(
    //                 collection(db, "posts"),
    //                 orderBy("timestamp", "desc"),
    //                 limit(20)
    //             );
    //             const unsubscribe = onSnapshot(q, (snapshot) => {
    //                 const newPosts = snapshot.docs.map((doc) => ({
    //                     id: doc.id,
    //                     ...doc.data(),
    //                 }));
    //                 setPosts(newPosts);
    //                 setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    //                 setLoading(false);
    //             });

    //             return () => unsubscribe();
    //         } catch (error) {
    //             console.error("Error fetching posts:", error);
    //             toast.error("Failed to load posts.");
    //             setLoading(false);
    //         }
    //     };

    //     fetchPosts();
    // }, []);

    // const fetchPosts = async () => {
    //     try {
    //         const postsCollection = collection(db, "posts");
    //         const snapshot = await setDoc(postsCollection);
    //         const postsData = snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));
    //         setPosts(postsData);
    //         return postsData; // Return the posts for external use
    //     } catch (error) {
    //         console.error("Error fetching posts:", error);
    //         throw error;
    //     }
    // };

    const fetchPosts = async () => {
        try {
            // Define a query to fetch the "posts" collection, ordered by "timestamp"
            const q = query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(20));

            // Fetch the documents in the query
            const snapshot = await getDoc(q);

            // Map the fetched documents into an array of posts
            const postsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Update the state with fetched posts
            setPosts(postsData);

            // Return the fetched posts
            return postsData;
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error; // Rethrow the error to handle it elsewhere
        }
    };

    // Load more posts for infinite scrolling
    const loadMorePosts = async () => {
        if (!lastVisible) return;

        try {
            const q = query(
                collection(db, "posts"),
                orderBy("timestamp", "desc"),
                startAfter(lastVisible),
                limit(20)
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const additionalPosts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts((prevPosts) => [...prevPosts, ...additionalPosts]);
                setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Error loading more posts:", error);
            toast.error("Failed to load more posts.");
        }
    };

    // Create new post 
    // Create a new post with a specified post ID
    const addPost = async (postId, postData) => {
        try {
            // Save the post in the Firestore "posts" collection with a specific document ID
            await setDoc(doc(db, "posts", postId), {
                ...postData,
                timestamp: serverTimestamp(), // Automatically set the server timestamp
                likes: 0, // Initialize likes count
                comments: [], // Initialize an empty comments array
            });

            // Optionally fetch the saved post data for local state update
            const postSnapshot = await getDoc(doc(db, "posts", postId));

            if (postSnapshot.exists()) {
                const newPost = {
                    id: postSnapshot.id,
                    ...postSnapshot.data(),
                };

                // Update the posts state by adding the newly created post
                setPosts((prevPosts) => [newPost, ...prevPosts]);
                toast.success("Post created successfully!");
            } else {
                console.warn("Post document does not exist after creation.");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Failed to create post.");
        }
    };


    // // Add a new post
    // const addPost = async (newPost) => {
    //     try {
    //         const docRef = await addDoc(collection(db, "posts"), {
    //             ...newPost,
    //             timestamp: serverTimestamp(),
    //             likes: 0, // Initialize likes count
    //         });

    //         const postSnapshot = await getDoc(docRef);

    //         if (postSnapshot.exists()) {
    //             const addedPost = {
    //                 id: postSnapshot.id,
    //                 ...postSnapshot.data(),
    //             };

    //             setPosts((prevPosts) => [addedPost, ...prevPosts]); // Add new post to the top
    //             toast.success("Post added successfully!");
    //         }
    //     } catch (error) {
    //         console.error("Error adding post:", error);
    //         toast.error("Failed to add post.");
    //     }
    // };

    // Like a post
    const likePost = async (postId) => {
        try {
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, {
                likes: increment(1),
            });

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId ? { ...post, likes: post.likes + 1 } : post
                )
            );

            toast.success("Liked the post!");
        } catch (error) {
            console.error("Error liking post:", error);
            toast.error("Failed to like post.");
        }
    };

    // Get posts by user
    const getPostsByUser = async (userId) => {
        try {
            const q = query(
                collection(db, "posts"),
                where("userId", "==", userId),
                orderBy("timestamp", "desc")
            );
            const snapshot = await getDoc(q);
            const userPosts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return userPosts; // Return user-specific posts
        } catch (error) {
            console.error("Error fetching user posts:", error);
            toast.error("Failed to fetch user posts.");
            return [];
        }
    };

    return (
        <PostContext.Provider
            value={{
                posts,
                loading,
                loadMorePosts,
                addPost,
                likePost,
                getPostsByUser,

                fetchPosts
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;