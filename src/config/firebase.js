import firebase from "firebase/app";
// import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYa9BEnXEOfF1ppo_jpF3IsziKcuiact4",
  authDomain: "sports-global-pro-admin.firebaseapp.com",
  projectId: "sports-global-pro-admin",
  storageBucket: "sports-global-pro-admin.appspot.com",
  messagingSenderId: "622393507994",
  appId: "1:622393507994:web:210ee30a4c5b54b74f9f23",
  measurementId: "G-50TLNQ2KR8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
