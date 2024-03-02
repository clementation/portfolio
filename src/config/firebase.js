// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA85dcd4HpY-mPz3A6ENGeXUOW_ClQpJG8",
  authDomain: "connorkealey-portfolio.firebaseapp.com",
  projectId: "connorkealey-portfolio",
  storageBucket: "connorkealey-portfolio.appspot.com",
  messagingSenderId: "713694913502",
  appId: "1:713694913502:web:afece5a41dbe4c5bacf34f",
  measurementId: "G-DDEE7NZ0M6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const database = getDatabase(app);
export const storage = getStorage(app, "gs://connorkealey-portfolio.appspot.com");