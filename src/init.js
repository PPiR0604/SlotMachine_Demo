// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXbfgJhsLKl05AQTl0apXor_hZV-0df60",
  authDomain: "demojudol.firebaseapp.com",
  projectId: "demojudol",
  storageBucket: "demojudol.firebasestorage.app",
  messagingSenderId: "783833232460",
  appId: "1:783833232460:web:4acb4afae397c8570db0e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const api=getFirestore(app);
