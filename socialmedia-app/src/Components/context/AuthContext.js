import React, { createContext, useState, useEffect } from "react";

import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import { auth, db, onAuthStateChanged } from "../firebase/firebaseConfig";

import { doc, setDoc, getDoc } from "firebase/firestore";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Track Authentication State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Fetch user details if available in Firestore
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setUser({ ...currentUser, ...userDoc.data() });
                } else {
                    setUser(currentUser); // Use Firebase data if Firestore data doesn't exist
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Email/Password Login
    // const login = async (email, password) => {
    //     try {
    //         const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //         return userCredential.user;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid; // Retrieve the user ID (UID)

            // Check if user exists in Firestore and update if necessary
            const userDocRef = doc(db, "users", userId);
            const userDocSnapshot = await getDoc(userDocRef);

            if (!userDocSnapshot.exists()) {
                // Create a new document for the user if it doesn't already exist
                await setDoc(userDocRef, {
                    email: userCredential.user.email,
                    createdAt: new Date().toISOString(),
                    userId,
                });
            }

            return { user: userCredential.user, userId }; // Return both the user object and the UID
        } catch (error) {
            throw error;
        }
    }

    // Email/Password Registration
    const register = async (email, password, firstName, lastName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Store user details in Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email,
                uid: user.uid,
                photoURL: user.photoURL || null,
                displayName: user.displayName || `${firstName} ${lastName}`,
            });
            return user;
        } catch (error) {
            throw error;
        }
    };

    // Google Sign-In
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user exists in Firestore, else create new entry
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                });
            }

            return user;
        } catch (error) {
            throw error;
        }
    };

    // Reset Password
    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw error;
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, login, register, loginWithGoogle, resetPassword, loading, logout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
