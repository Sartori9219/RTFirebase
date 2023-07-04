import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //   apiKey: process.env.REACT_APP_FIREBASE_KEY,
  apiKey: "AIzaSyCSQi6J6wij_QVLeIN3DgEO4TCGiaXdKGw",
  authDomain: "grape-stories.firebaseapp.com",
  databaseURL: "https://grape-stories-default-rtdb.firebaseio.com",
  projectId: "grape-stories",
  storageBucket: "grape-stories.appspot.com",
  messagingSenderId: "486307962084",
  appId: "1:486307962084:web:463e4a7c385c15aaaea0f1",
  measurementId: "G-T56C14WJWD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
