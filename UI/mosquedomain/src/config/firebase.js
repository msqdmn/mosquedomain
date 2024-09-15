// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkv9E01UtdyppFIrHP8ZBoY0hCm7L_9CM",
  authDomain: "mosqueadmin-92021.firebaseapp.com",
  projectId: "mosqueadmin-92021",
  storageBucket: "mosqueadmin-92021.appspot.com",
  messagingSenderId: "81169979527",
  appId: "1:81169979527:web:2f7c0a7b7013a109908022",
  measurementId: "G-VEQ5HNMN3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);