import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// FIRE-SPREAD 프로젝트 (지금 할당량 다 써서 새로 프로젝트 만들었음)
// const firebaseConfig = {
//   apiKey: "AIzaSyDEf9vBBKXzPyXsBEuaOE7P_JCBX4i09gs",
//   authDomain: "fire-spread-b3754.firebaseapp.com",
//   projectId: "fire-spread-b3754",
//   storageBucket: "fire-spread-b3754.appspot.com",
//   messagingSenderId: "192211431486",
//   appId: "1:192211431486:web:7e95ac3464175bf921616f",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

// export const storage = getStorage(app);

// export const db = getFirestore(app);
// -------------------------------------------------------------
// 테스트 프로젝트

const firebaseConfig = {
  apiKey: "AIzaSyCbxht9sw5PbzpcN2BDqF2zg2q2qmf0j1w",
  authDomain: "test-a7c32.firebaseapp.com",
  projectId: "test-a7c32",
  storageBucket: "test-a7c32.appspot.com",
  messagingSenderId: "15590241964",
  appId: "1:15590241964:web:ee3f583c41dcf308e35109",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
