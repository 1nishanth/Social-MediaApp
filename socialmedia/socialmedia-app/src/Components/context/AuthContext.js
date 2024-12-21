import React, { createContext, useState, useEffect } from "react";
import {
    auth,
    provider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut
} from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    };

    const register = async (email, password, firstName, lastName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email,
            });
            return user;
        } catch (error) {
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            throw error;
        }
    };

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth)
            setUser(null);
        }
        catch (error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, login, register, loginWithGoogle, resetPassword, loading }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;