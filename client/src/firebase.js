// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "property-navigator-18b7c.firebaseapp.com",
  projectId: "property-navigator-18b7c",
  storageBucket: "property-navigator-18b7c.appspot.com",
  messagingSenderId: "803824965990",
  appId: "1:803824965990:web:3f862e778503f1b9ce10a7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 
