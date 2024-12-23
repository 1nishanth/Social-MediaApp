
// import { initializeApp } from "firebase/app";
// // import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

// import {
//     getAuth,
//     GoogleAuthProvider,
//     signInWithPopup,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     onAuthStateChanged,
//     sendPasswordResetEmail,
//     signOut
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyA-j9s_QfJ_qMoOwvrV-A8tDnbsoQPrbgw",
//     authDomain: "socialmedia-app-252d8.firebaseapp.com",
//     projectId: "socialmedia-app-252d8",
//     storageBucket: "socialmedia-app-252d8.firebasestorage.app",
//     messagingSenderId: "475650325044",
//     appId: "1:475650325044:web:d5ac4707d89c19a532a861",
//     measurementId: "G-JN2DNECYQM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)
// const provider = new GoogleAuthProvider();
// const db = getFirestore(app)


// export {
//     auth,
//     provider,
//     db,
//     signInWithPopup,
//     sendPasswordResetEmail,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     onAuthStateChanged,
//     signOut
// };



import { initializeApp } from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA-j9s_QfJ_qMoOwvrV-A8tDnbsoQPrbgw",
    authDomain: "socialmedia-app-252d8.firebaseapp.com",
    projectId: "socialmedia-app-252d8",
    storageBucket: "socialmedia-app-252d8.firebasestorage.app",
    messagingSenderId: "475650325044",
    appId: "1:475650325044:web:d5ac4707d89c19a532a861",
    measurementId: "G-JN2DNECYQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// const provider = new GoogleAuthProvider();
const db = getFirestore(app)

export { auth, db, onAuthStateChanged };

