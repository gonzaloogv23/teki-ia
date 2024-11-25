// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsn_XwDfxYjjoKGnVubGATJUu3tDtgVj0",
  authDomain: "yocreciendo-87385.firebaseapp.com",
  projectId: "yocreciendo-87385",
  storageBucket: "yocreciendo-87385.appspot.com",
  messagingSenderId: "141109326656",
  appId: "1:141109326656:web:8273067fea64291f2540a5",
  measurementId: "G-D0ZP502SYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage , firebaseConfig};
