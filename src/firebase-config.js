// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc0pB6OVoRdhBZnLWjaZwQofnBGFK40fs",
  authDomain: "linktree-demo-638d9.firebaseapp.com",
  projectId: "linktree-demo-638d9",
  storageBucket: "linktree-demo-638d9.appspot.com",
  messagingSenderId: "347130502662",
  appId: "1:347130502662:web:8e6a74b32cd5585ad16d87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { analytics, db };
