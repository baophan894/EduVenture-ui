import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDlbwNJ2dtGd9q9If0JzK6k4YN7kX505hQ",
  authDomain: "testmely-b58bd.firebaseapp.com",
  projectId: "testmely-b58bd",
  storageBucket: "testmely-b58bd.appspot.com",
  messagingSenderId: "541613429718",
  appId: "1:541613429718:web:0d0a2dc9badb316c3d0a77",
  measurementId: "G-GBSPFJFHPK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const logout = () => {
  signOut(auth);
};
export { auth, GoogleProvider, logout };
