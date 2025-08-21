// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// paste your firebaseConfig here 👇
const firebaseConfig = {
  apiKey: "AIzaSyDr9uBnxKfOUe9ANHqyQUG7aq49uSiyh_s",
  authDomain: "todo-app-a73bb.firebaseapp.com",
  projectId: "todo-app-a73bb",
  storageBucket: "todo-app-a73bb.firebasestorage.app",
  messagingSenderId: "859944746039",
  appId: "1:859944746039:web:d168a7f99928d8d6dd53b2",
  measurementId: "G-SF0GLF0REK"
};

// init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"   // 👈 forces account selection
});

export { auth, provider, signInWithPopup, signOut };
