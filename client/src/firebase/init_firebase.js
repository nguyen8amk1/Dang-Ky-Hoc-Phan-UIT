// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBB1E2Tj71iGyvfsbWBA2gKQLSlED7u_8g",
    authDomain: "nalendar-c7b98.firebaseapp.com",
    projectId: "nalendar-c7b98",
    storageBucket: "nalendar-c7b98.appspot.com",
    messagingSenderId: "968630266999",
    appId: "1:968630266999:web:8afc989aae3b7ac075ea72",
    measurementId: "G-0FLF6MQQWH", 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
