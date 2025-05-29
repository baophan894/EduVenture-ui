import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC8p4FpP9UfxhFJw9f9GL0CJD0RupcHmuo",
  authDomain: "eduveneture.firebaseapp.com",
  projectId: "eduveneture",
  storageBucket: "eduveneture.firebasestorage.app",
  messagingSenderId: "494037332399",
  appId: "1:494037332399:web:06d0bbeb3ec3e90e057f5a",
  measurementId: "G-NKN9130R90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const logout = () => {
  signOut(auth);
};
export { auth, GoogleProvider, logout };
