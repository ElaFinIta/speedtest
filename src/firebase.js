import { initializeApp } from "firebase/app";  // create firebase app
import { getFirestore } from "@firebase/firestore";
import firebaseConfig from "./firebaseConfig.json";

// const firebaseConfig = process.env.REACT_APP_FIREBASE_APP_CONFIG;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);