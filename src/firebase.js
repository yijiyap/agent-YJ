import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, set } from "firebase/database";
// require('dotenv').config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLS_RdY5eC8wTA87g4J2WPBQRKvtOAQQU",
  authDomain: "agent-yj-ade4a.firebaseapp.com",
  projectId: "agent-yj-ade4a",
  storageBucket: "agent-yj-ade4a.appspot.com",
  messagingSenderId: "720515191410",
  appId: "1:720515191410:web:a09e7d79676e6fd4cb68eb",
  databaseURL: "https://agent-yj-ade4a-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   databaseURL: process.env.DATABASE_URL,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { app, db}