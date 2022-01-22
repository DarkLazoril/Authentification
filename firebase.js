import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ8Dm80UHvECws8OWkGxtvUfBw42dGmZs",
  authDomain: "login-c27fb.firebaseapp.com",
  projectId: "login-c27fb",
  storageBucket: "login-c27fb.appspot.com",
  messagingSenderId: "1037245834699",
  appId: "1:1037245834699:web:bcb888a340429ed792824e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
