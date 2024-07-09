// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASYZ1w0w2kIgjhU796l_cpaBUSAreXsRE",
  authDomain: "re-inventory-client.firebaseapp.com",
  projectId: "re-inventory-client",
  storageBucket: "re-inventory-client.appspot.com",
  messagingSenderId: "1005530095756",
  appId: "1:1005530095756:web:af23ee592d6f3dbad09ba9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance to be used in other parts of your app
const auth = getAuth(app);

export { app, auth };