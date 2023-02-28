import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
 
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
export async function signup(email, username, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return updateProfile(user, { displayName: username });
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
export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export default app