import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEf9vBBKXzPyXsBEuaOE7P_JCBX4i09gs",
  authDomain: "fire-spread-b3754.firebaseapp.com",
  projectId: "fire-spread-b3754",
  storageBucket: "fire-spread-b3754.appspot.com",
  messagingSenderId: "192211431486",
  appId: "1:192211431486:web:7e95ac3464175bf921616f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
