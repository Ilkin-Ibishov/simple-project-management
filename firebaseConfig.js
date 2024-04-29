// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUCobvUeuNd6dAfOQbrhM-SmihNweSa2E",
  authDomain: "simple-project-managemen-34ce0.firebaseapp.com",
  projectId: "simple-project-managemen-34ce0",
  storageBucket: "simple-project-managemen-34ce0.appspot.com",
  messagingSenderId: "939908223670",
  appId: "1:939908223670:web:e4182c8075cb0b4cafcc17",
  measurementId: "G-THF0ZF48X3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);