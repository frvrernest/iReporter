// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFNdXTndDwno7H3gxRib8gwvrhEW_qpaw",
  authDomain: "ireporter-bb6f5.firebaseapp.com",
  projectId: "ireporter-bb6f5",
  storageBucket: "ireporter-bb6f5.appspot.com",
  messagingSenderId: "463309792460",
  appId: "1:463309792460:web:a53575217077209aed0e69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
