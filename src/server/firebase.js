// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
         GoogleAuthProvider,
         getAuth,
         signInWithPopup,
         signInWithEmailAndPassword,
         createUserWithEmailAndPassword,
         sendPasswordResetEmail,
         signOut,
        } from "firebase/auth";
import {
         getFirestore,
         query,
         getDocs,
         collection,
         where,
         addDoc,
        } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv-NGtC7m3N_iTqWMLrmAhIAJAinI-DOY",
  authDomain: "react-auth-2dba7.firebaseapp.com",
  projectId: "react-auth-2dba7",
  storageBucket: "react-auth-2dba7.appspot.com",
  messagingSenderId: "179823339128",
  appId: "1:179823339128:web:3eeab6563fe98717e06f8d",
  measurementId: "G-T0Q82V8VS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {

        try {
                await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
                console.error(err);
                alert(err.message);
        }
};

const registerWithEmailAndPassword = async (name, email, password) => {

        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const user = res.user;
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
          });
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
};

const logout = () => {
        signOut(auth);
};

const sendPasswordReset = async (email) => {
        try {
          await sendPasswordResetEmail(auth, email);
          alert("Password reset link sent!");
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
};

export {
        app,
        auth,
        db,
        logInWithEmailAndPassword,
        registerWithEmailAndPassword,
        sendPasswordReset,
        logout,
        firebaseConfig,
      };