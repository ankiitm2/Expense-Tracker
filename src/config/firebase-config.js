// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBK_7MeI17WcwgFrgmhyZtMHBF3pk8wzlY",
    authDomain: "expense-tracker-fc82b.firebaseapp.com",
    projectId: "expense-tracker-fc82b",
    storageBucket: "expense-tracker-fc82b.appspot.com",
    messagingSenderId: "719479484553",
    appId: "1:719479484553:web:ac0dd688814ce8cca65658"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);