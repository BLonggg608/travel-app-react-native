// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNUZmGO5I3i-2n8wuKlbD3-nAUj8H7diw",
  authDomain: "ai-travel-planner-3581e.firebaseapp.com",
  projectId: "ai-travel-planner-3581e",
  storageBucket: "ai-travel-planner-3581e.firebasestorage.app",
  messagingSenderId: "168877327221",
  appId: "1:168877327221:web:693680101eeb4ebf83893c",
  measurementId: "G-J1DLRY70VC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
