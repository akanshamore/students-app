// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc93wHWQlGcWHXwU4wBMp3I3tCssMNcas",
  authDomain: "login-auth-cc866.firebaseapp.com",
  projectId: "login-auth-cc866",
  storageBucket: "login-auth-cc866.firebasestorage.app",
  messagingSenderId: "367963635022",
  appId: "1:367963635022:web:c9da01cf22950c6ba3721f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
