// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCOm9ml6_hTJiwamyW00gtTUAYd3jZsRo",
  authDomain: "teki-ia.firebaseapp.com",
  projectId: "teki-ia",
  storageBucket: "teki-ia.firebasestorage.app",
  messagingSenderId: "434071739510",
  appId: "1:434071739510:web:f84ac70a1975f7e5ca5357"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };